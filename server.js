import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
import multer from 'multer';
import fs from 'fs';

// New Database Abstraction Layer
import { initDb, getDb, getStatus } from './db/index.js';
import UserRepository from './db/repositories/UserRepository.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-for-dev';

// Configure Multer for media uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

const profileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and WEBP images are allowed'));
    }
  }
});

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable for easier local dev, enable for prod
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: { error: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Initialize Database
async function startServer() {
  try {
    await initDb();
    await ensureRuntimeSchema();
    const status = getStatus();
    console.log(`Database initialized: ${status.dbType} (Fallback: ${status.isUsingFallback})`);
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('CRITICAL: Failed to initialize database. Server cannot start.', err);
    process.exit(1);
  }
}

startServer();

async function ensureRuntimeSchema() {
  try {
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS public.bank_accounts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        bank_name TEXT NOT NULL,
        account_number TEXT NOT NULL,
        account_holder_name TEXT NOT NULL,
        swift_bic TEXT,
        routing_info TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
  } catch {
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS bank_accounts (
        id CHAR(36) PRIMARY KEY,
        bank_name VARCHAR(255) NOT NULL,
        account_number VARCHAR(255) NOT NULL,
        account_holder_name VARCHAR(255) NOT NULL,
        swift_bic VARCHAR(255),
        routing_info TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  try {
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS public.bank_transfer_donations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        amount DECIMAL(10, 2) NOT NULL,
        currency TEXT NOT NULL DEFAULT 'NGN',
        reference TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
  } catch {
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS bank_transfer_donations (
        id CHAR(36) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(20) NOT NULL DEFAULT 'NGN',
        reference VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  try {
    await dbQuery('ALTER TABLE public.donors ADD COLUMN IF NOT EXISTS bio TEXT');
    await dbQuery('ALTER TABLE public.donors ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true');
    await dbQuery('ALTER TABLE public.donors ADD COLUMN IF NOT EXISTS avatar_url TEXT');
    await dbQuery('ALTER TABLE public.posts DROP COLUMN IF EXISTS scheduled_at');
  } catch {
    await dbQuery('ALTER TABLE donors ADD COLUMN IF NOT EXISTS bio TEXT');
    await dbQuery('ALTER TABLE donors ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true');
    await dbQuery('ALTER TABLE donors ADD COLUMN IF NOT EXISTS avatar_url TEXT');
    await dbQuery('ALTER TABLE posts DROP COLUMN IF EXISTS scheduled_at');
  }
}

// Helper to format table names for Knex (handles schema differences)
const formatTable = (table) => {
  const db = getDb();
  if (db.client.config.client === 'mysql2') {
    return table.replace('public.', '').replace('auth.', '');
  }
  return table;
};

// Helper for raw queries (maintains some compatibility with old pool.query)
const dbQuery = async (sql, params = []) => {
  const db = getDb();
  // Knex uses ? for placeholders, while pg uses $1, $2
  // We need to convert $1, $2 to ? for Knex if it's not PostgreSQL
  let formattedSql = sql;
  if (db.client.config.client !== 'pg') {
    formattedSql = sql.replace(/\$\d+/g, '?');
  }
  
  // Also handle table name formatting for schemas
  formattedSql = formattedSql.replace(/public\./g, db.client.config.client === 'mysql2' ? '' : 'public.');
  formattedSql = formattedSql.replace(/auth\./g, db.client.config.client === 'mysql2' ? '' : 'auth.');

  const result = await db.raw(formattedSql, params);
  
  // Knex raw result format differs between pg and mysql2
  if (db.client.config.client === 'pg') {
    return { rows: result.rows };
  } else {
    return { rows: result[0] };
  }
};

// --- Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// --- Auth Routes ---

// Admin Cryptic Login
const ADMIN_PATH = process.env.ADMIN_PATH || 'adonai-admin-secret-access';
console.log(`Admin cryptic path registered at: /api/auth/${ADMIN_PATH}`);

app.post(`/api/auth/${ADMIN_PATH}`, authLimiter, async (req, res) => {
  const { email, password } = req.body;
  
  // Sanitization
  const sanitizedEmail = validator.normalizeEmail(email || '');
  
  if (!sanitizedEmail || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await UserRepository.findByEmail(sanitizedEmail);
    
    // Log login attempt
    await UserRepository.addAuditLog({
      action: 'LOGIN_ATTEMPT',
      entity_type: 'USER',
      metadata: JSON.stringify({ email: sanitizedEmail, success: !!user }),
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    if (!user || !user.password_hash) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const roles = await UserRepository.getRoles(user.id);
    
    if (!roles.includes('admin') && !roles.includes('super_admin')) {
      return res.status(403).json({ error: 'Access Denied' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, roles }, JWT_SECRET, { expiresIn: '12h' });
    
    // Log success
    await UserRepository.addAuditLog({
      user_id: user.id,
      action: 'LOGIN_SUCCESS',
      entity_type: 'USER',
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    res.json({ token, user: { id: user.id, email: user.email, roles } });
  } catch (err) {
    console.error('Admin cryptic login error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Password Reset Request
app.post('/api/auth/reset-password-request', async (req, res) => {
  const { email } = req.body;
  const sanitizedEmail = validator.normalizeEmail(email || '');
  
  try {
    const userResult = await dbQuery('SELECT id FROM auth.users WHERE email = $1', [sanitizedEmail]);
    if (userResult.rows.length === 0) {
      // Don't reveal if user exists for security
      return res.json({ message: 'If an account exists, a reset link will be sent.' });
    }

    const token = jwt.sign({ id: userResult.rows[0].id, type: 'password_reset' }, JWT_SECRET, { expiresIn: '1h' });
    
    // In a real app, send email here. For now, log it.
    console.log(`Password reset link for ${sanitizedEmail}: http://localhost:5173/auth/reset-password?token=${token}`);
    
    res.json({ message: 'If an account exists, a reset link will be sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== 'password_reset') throw new Error('Invalid token type');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await dbQuery('UPDATE auth.users SET password_hash = $1 WHERE id = $2', [hashedPassword, decoded.id]);
    
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

// Signup
app.post('/api/auth/signup', authLimiter, async (req, res) => {
  const { email, password, full_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const userExists = await dbQuery('SELECT * FROM auth.users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await dbQuery(
      'INSERT INTO auth.users (email, password_hash, raw_user_meta_data) VALUES ($1, $2, $3) RETURNING id, email',
      [email, hashedPassword, JSON.stringify({ full_name })]
    );

    const userId = newUser.rows[0].id;

    await dbQuery(
      'INSERT INTO public.donors (id, email, full_name) VALUES ($1, $2, $3)',
      [userId, email, full_name]
    );

    await dbQuery(
      "INSERT INTO public.user_roles (user_id, role) VALUES ($1, 'donor')",
      [userId]
    );

    res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- Admin API Routes ---

// Get all users (Admin only)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const result = await dbQuery(`
      SELECT u.id, u.email, u.created_at, d.full_name, d.phone, 
             array_agg(r.role) as roles
      FROM auth.users u
      LEFT JOIN public.donors d ON u.id = d.id
      LEFT JOIN public.user_roles r ON u.id = r.user_id
      GROUP BY u.id, d.full_name, d.phone
      ORDER BY u.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user role
app.patch('/api/admin/users/:id/role', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('super_admin')) return res.status(403).json({ error: 'Forbidden' });
  const { role, action } = req.body; // action: 'add' or 'remove'
  try {
    if (action === 'add') {
      await dbQuery('INSERT INTO public.user_roles (user_id, role) VALUES ($1, $2) ON CONFLICT DO NOTHING', [req.params.id, role]);
    } else {
      await dbQuery('DELETE FROM public.user_roles WHERE user_id = $1 AND role = $2', [req.params.id, role]);
    }
    res.json({ message: 'Role updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all donations (Admin only)
app.get('/api/admin/donations', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const { status, search, minAmount, maxAmount, startDate, endDate, gateway } = req.query;
    let query = 'SELECT d.*, dr.full_name, dr.email FROM public.donations d LEFT JOIN public.donors dr ON d.donor_id = dr.id WHERE 1=1';
    const params = [];
    
    if (status) {
      params.push(status);
      query += ` AND d.status = $${params.length}`;
    }
    
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (dr.full_name ILIKE $${params.length} OR d.reference ILIKE $${params.length} OR dr.email ILIKE $${params.length})`;
    }

    if (minAmount) {
      params.push(minAmount);
      query += ` AND d.amount >= $${params.length}`;
    }

    if (maxAmount) {
      params.push(maxAmount);
      query += ` AND d.amount <= $${params.length}`;
    }

    if (startDate) {
      params.push(startDate);
      query += ` AND d.created_at >= $${params.length}`;
    }

    if (endDate) {
      params.push(endDate);
      query += ` AND d.created_at <= $${params.length}`;
    }

    if (gateway) {
      params.push(gateway);
      query += ` AND d.gateway = $${params.length}`;
    }

    query += ' ORDER BY d.created_at DESC';
    const result = await dbQuery(query, params);

    let bankTransfers = [];
    if (!status || status === 'pending' || status === 'successful' || status === 'failed') {
      const bankTransferResult = await dbQuery(`
        SELECT
          id, full_name, email, amount, currency,
          'bank_transfer' as gateway, status, reference, created_at
        FROM public.bank_transfer_donations
        ORDER BY created_at DESC
      `);
      bankTransfers = bankTransferResult.rows;
    }

    res.json([...(result.rows || []), ...bankTransfers].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Message Management (Enhanced)
app.patch('/api/admin/messages/status', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { ids, status } = req.body; // ids is an array
  try {
    await dbQuery('UPDATE public.contact_submissions SET status = $1 WHERE id = ANY($2)', [status, ids]);
    res.json({ message: 'Messages updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/admin/messages', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { ids } = req.body;
  try {
    await dbQuery('DELETE FROM public.contact_submissions WHERE id = ANY($1)', [ids]);
    res.json({ message: 'Messages deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CMS Management disabled in admin dashboard
app.get('/api/admin/content', authenticateToken, async (req, res) => {
  return res.status(410).json({ error: 'Site content management is disabled in admin dashboard' });
});

app.patch('/api/admin/content/:id', authenticateToken, async (req, res) => {
  return res.status(410).json({ error: 'Site content management is disabled in admin dashboard' });
});

app.post('/api/admin/content', authenticateToken, async (req, res) => {
  return res.status(410).json({ error: 'Site content management is disabled in admin dashboard' });
});

// Media Upload
app.post('/api/admin/upload', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// User Management (Enhanced)
app.post('/api/admin/users', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { email, password, full_name, roles } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await dbQuery(
      'INSERT INTO auth.users (email, password_hash, raw_user_meta_data) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, JSON.stringify({ full_name })]
    );
    const userId = newUser.rows[0].id;

    await dbQuery('INSERT INTO public.donors (id, email, full_name) VALUES ($1, $2, $3)', [userId, email, full_name]);
    
    for (const role of roles) {
      await dbQuery('INSERT INTO public.user_roles (user_id, role) VALUES ($1, $2)', [userId, role]);
    }

    res.status(201).json({ id: userId, message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/admin/users/:id', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await dbQuery('DELETE FROM auth.users WHERE id = $1', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/admin/users/:id/status', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { is_active } = req.body;
  try {
    // Assuming we add is_active to donors or auth.users
    await dbQuery('UPDATE public.donors SET updated_at = NOW() WHERE id = $1', [req.params.id]);
    // In a real app, you'd have a column for this. For now, let's assume we use metadata or a separate column.
    res.json({ message: 'User status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CMS (Enhanced)
app.patch('/api/admin/posts/:id', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin') && !req.user.roles.includes('author')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { title, content, excerpt, status, category_id } = req.body;
  try {
    const result = await dbQuery(
      `UPDATE public.posts 
       SET title = $1, content = $2, excerpt = $3, status = $4, category_id = $5, updated_at = NOW() 
       WHERE id = $6 RETURNING *`,
      [title, content, excerpt, status, category_id, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/admin/posts/:id', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await dbQuery('DELETE FROM public.posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/admin/posts/:id/versions', authenticateToken, async (req, res) => {
  try {
    const result = await dbQuery('SELECT * FROM public.post_versions WHERE post_id = $1 ORDER BY created_at DESC', [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get audit logs
app.get('/api/admin/audit-logs', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('super_admin')) return res.status(403).json({ error: 'Forbidden' });
  try {
    const result = await dbQuery(`
      SELECT a.*, d.full_name as user_name 
      FROM public.audit_logs a 
      LEFT JOIN public.donors d ON a.user_id = d.id 
      ORDER BY a.created_at DESC LIMIT 100
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Payment configuration
app.get('/api/admin/payments', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('super_admin')) return res.status(403).json({ error: 'Forbidden' });
  try {
    const result = await dbQuery('SELECT * FROM public.payment_config');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/admin/payments/:gateway', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('super_admin')) return res.status(403).json({ error: 'Forbidden' });
  const { public_key, secret_key, is_active, test_mode } = req.body;
  try {
    await dbQuery(`
      INSERT INTO public.payment_config (gateway, public_key, secret_key, is_active, test_mode)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (gateway) DO UPDATE SET
        public_key = EXCLUDED.public_key,
        secret_key = EXCLUDED.secret_key,
        is_active = EXCLUDED.is_active,
        test_mode = EXCLUDED.test_mode,
        updated_at = NOW()
    `, [req.params.gateway, public_key, secret_key, is_active, test_mode]);
    res.json({ message: 'Config updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile Management
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const result = await dbQuery('SELECT * FROM public.donors WHERE id = $1', [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/profile', authenticateToken, async (req, res) => {
  const { full_name, phone, bio, is_public, avatar_url } = req.body;
  if (!full_name || full_name.trim().length < 2) {
    return res.status(400).json({ error: 'Full name is required and must be at least 2 characters.' });
  }
  if (phone && !validator.isMobilePhone(phone + '', 'any', { strictMode: false })) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }
  if (avatar_url && !validator.isURL(avatar_url, { require_protocol: false, allow_underscores: true })) {
    return res.status(400).json({ error: 'Profile image URL is invalid.' });
  }
  try {
    const result = await dbQuery(
      'UPDATE public.donors SET full_name = $1, phone = $2, bio = $3, is_public = $4, avatar_url = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [full_name.trim(), phone || null, bio || null, typeof is_public === 'boolean' ? is_public : true, avatar_url || null, req.user.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Profile not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile. Please try again.' });
  }
});

app.post('/api/profile/avatar', authenticateToken, profileUpload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please choose an image to upload.' });
  }
  const avatarUrl = `/uploads/${req.file.filename}`;
  try {
    const result = await dbQuery(
      'UPDATE public.donors SET avatar_url = $1, updated_at = NOW() WHERE id = $2 RETURNING avatar_url',
      [avatarUrl, req.user.id]
    );
    res.json({ avatar_url: result.rows[0]?.avatar_url || avatarUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save profile picture.' });
  }
});

// --- Post Management (Enhanced) ---

app.post('/api/admin/posts', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin') && !req.user.roles.includes('author')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { title, slug, content, excerpt, category_id, status } = req.body;
  try {
    const result = await dbQuery(
      'INSERT INTO public.posts (title, slug, content, excerpt, category_id, status, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, slug, content, excerpt, category_id, status, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Bank transfer accounts (public read for donation instructions)
app.get('/api/donations/bank-accounts', async (req, res) => {
  try {
    const result = await dbQuery(`
      SELECT id, bank_name, account_number, account_holder_name, swift_bic, routing_info
      FROM public.bank_accounts
      WHERE is_active = true
      ORDER BY created_at DESC
    `);
    res.json(result.rows || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load bank account details.' });
  }
});

app.post('/api/donations/bank-transfer', async (req, res) => {
  const { full_name, email, phone, amount, currency = 'NGN' } = req.body;
  if (!full_name || full_name.trim().length < 2) {
    return res.status(400).json({ error: 'Full name is required.' });
  }
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }
  if (!amount || Number(amount) < 100) {
    return res.status(400).json({ error: 'Minimum donation amount is ₦100.' });
  }
  const reference = `BANK-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  try {
    const insert = await dbQuery(
      `INSERT INTO public.bank_transfer_donations (full_name, email, phone, amount, currency, reference, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, reference, status, created_at`,
      [full_name.trim(), validator.normalizeEmail(email), phone || null, amount, currency, reference, 'pending']
    );
    const accounts = await dbQuery(
      `SELECT id, bank_name, account_number, account_holder_name, swift_bic, routing_info
       FROM public.bank_accounts WHERE is_active = true ORDER BY created_at DESC`
    );
    res.status(201).json({ donation: insert.rows[0], bank_accounts: accounts.rows || [] });
  } catch (err) {
    res.status(500).json({ error: 'Unable to create bank transfer request.' });
  }
});

// Bank account management (admin)
app.get('/api/admin/bank-accounts', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const result = await dbQuery('SELECT * FROM public.bank_accounts ORDER BY created_at DESC');
    res.json(result.rows || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load bank accounts.' });
  }
});

app.post('/api/admin/bank-accounts', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { bank_name, account_number, account_holder_name, swift_bic, routing_info, is_active = true } = req.body;
  if (!bank_name || !account_number || !account_holder_name) {
    return res.status(400).json({ error: 'Bank name, account number and account holder name are required.' });
  }
  if (!/^[a-zA-Z0-9\s\-]+$/.test(account_number) || account_number.length < 6) {
    return res.status(400).json({ error: 'Account number format is invalid.' });
  }
  if (swift_bic && !/^[A-Za-z0-9]{8,11}$/.test(swift_bic)) {
    return res.status(400).json({ error: 'SWIFT/BIC must be 8 to 11 alphanumeric characters.' });
  }
  try {
    const result = await dbQuery(
      `INSERT INTO public.bank_accounts (bank_name, account_number, account_holder_name, swift_bic, routing_info, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [bank_name.trim(), account_number.trim(), account_holder_name.trim(), swift_bic || null, routing_info || null, !!is_active]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save bank account.' });
  }
});

app.patch('/api/admin/bank-accounts/:id', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { bank_name, account_number, account_holder_name, swift_bic, routing_info, is_active } = req.body;
  try {
    const result = await dbQuery(
      `UPDATE public.bank_accounts
       SET bank_name = $1, account_number = $2, account_holder_name = $3, swift_bic = $4, routing_info = $5, is_active = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [bank_name, account_number, account_holder_name, swift_bic || null, routing_info || null, !!is_active, req.params.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Bank account not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bank account.' });
  }
});

app.delete('/api/admin/bank-accounts/:id', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await dbQuery('DELETE FROM public.bank_accounts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Bank account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bank account.' });
  }
});

// Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await dbQuery('SELECT * FROM auth.users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !user.password_hash) {
      console.log(`Login attempt failed: ${!user ? 'User not found' : 'User has no password set'}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Get roles
    const rolesResult = await dbQuery('SELECT role FROM public.user_roles WHERE user_id = $1', [user.id]);
    const roles = rolesResult.rows.map(r => r.role);

    const token = jwt.sign({ id: user.id, email: user.email, roles }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, user: { id: user.id, email: user.email, roles } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Current User (Profile)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// --- API Routes ---

// Get all published posts
app.get('/api/posts', async (req, res) => {
  try {
    const { category, status = 'published' } = req.query;
    let query = 'SELECT p.*, c.name as category_name FROM public.posts p LEFT JOIN public.categories c ON p.category_id = c.id WHERE p.status = $1';
    const params = [status];

    if (category && category !== 'all') {
      query += ' AND p.category_id = $2';
      params.push(category);
    }

    query += ' ORDER BY p.published_at DESC';
    const result = await dbQuery(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const result = await dbQuery(
      'SELECT p.*, c.name as category_name FROM public.posts p LEFT JOIN public.categories c ON p.category_id = c.id WHERE p.slug = $1',
      [req.params.slug]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await dbQuery('SELECT * FROM public.categories');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get site content
app.get('/api/content', async (req, res) => {
  try {
    const { page, section } = req.query;
    let query = 'SELECT * FROM public.site_content';
    const params = [];
    if (page) {
      query += ' WHERE page = $1';
      params.push(page);
      if (section) {
        query += ' AND section = $2';
        params.push(section);
      }
    }
    const result = await dbQuery(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Submit volunteer application
app.post('/api/volunteer', async (req, res) => {
  try {
    const { full_name, email, phone, state, area_of_interest, motivation } = req.body;
    const result = await dbQuery(
      'INSERT INTO public.volunteer_applications (full_name, email, phone, state, area_of_interest, motivation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [full_name, email, phone, state, area_of_interest, motivation]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get volunteer applications (Admin only)
app.get('/api/volunteer', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const result = await dbQuery('SELECT * FROM public.volunteer_applications ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, subject, message } = req.body;
    if (!first_name || !last_name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required contact fields' });
    }

    const normalizedEmail = validator.normalizeEmail(email || '');
    if (!normalizedEmail) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const insertResult = await dbQuery(
      'INSERT INTO public.contact_submissions (first_name, last_name, email, phone, subject, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at, status',
      [first_name.trim(), last_name.trim(), normalizedEmail, phone || null, subject.trim(), message.trim(), 'new']
    );

    const savedSubmission = insertResult.rows[0] || null;
    res.status(201).json({ message: 'Submission received', submission: savedSubmission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all contact submissions (Admin only)
app.get('/api/contact', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const result = await dbQuery('SELECT * FROM public.contact_submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get donor donations
app.get('/api/donations', authenticateToken, async (req, res) => {
  try {
    const { donorId } = req.query;
    if (req.user.id !== donorId && !req.user.roles.includes('admin') && !req.user.roles.includes('super_admin')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const result = await dbQuery(
      'SELECT d.*, dr.full_name as donor_name FROM public.donations d LEFT JOIN public.donors dr ON d.donor_id = dr.id WHERE d.donor_id = $1 ORDER BY d.created_at DESC',
      [donorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update database schema to support hashed passwords (Run once)
app.post('/api/admin/init-db', authenticateToken, async (req, res) => {
  if (!req.user.roles.includes('super_admin')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await dbQuery('ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS password_hash TEXT');
    res.json({ message: 'Database schema updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// API 404 handler - must come before SPA catch-all
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `API endpoint ${req.method} ${req.url} not found` });
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
