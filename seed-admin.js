import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectionString = 'postgresql://postgres:HWoQFlPllARlTTTfWbQhecSquRBwrXaa@tramway.proxy.rlwy.net:48715/railway';

async function seedAdmin() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database.');

    const adminEmail = 'admin@adonai.org';
    const adminPassword = 'Admin123!';
    const adminId = '00000000-0000-0000-0000-000000000001';

    // Hash password for seeding
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // 1. Create User in auth.users
    console.log(`Updating mock auth user ${adminEmail} with password...`);
    await client.query(`
      INSERT INTO auth.users (id, email, password_hash, raw_user_meta_data)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET email = $2, password_hash = $3, raw_user_meta_data = $4;
    `, [adminId, adminEmail, hashedPassword, JSON.stringify({ full_name: 'Test Super Admin' })]);

    // 2. Create User in public.donors
    console.log('Creating donor profile...');
    await client.query(`
      INSERT INTO public.donors (id, email, full_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO UPDATE SET email = $2, full_name = $3;
    `, [adminId, adminEmail, 'Test Super Admin']);

    // 3. Assign Super Admin Role
    console.log('Assigning super_admin role...');
    await client.query(`
      INSERT INTO public.user_roles (user_id, role)
      VALUES ($1, 'super_admin')
      ON CONFLICT (user_id, role) DO NOTHING;
    `, [adminId]);

    // 4. Create Sample Categories
    console.log('Creating sample categories...');
    const cat1Id = uuidv4();
    const cat2Id = uuidv4();
    await client.query(`
      INSERT INTO public.categories (id, name, slug, description)
      VALUES 
        ($1, 'Education', 'education', 'Impact stories from our schools'),
        ($2, 'Healthcare', 'healthcare', 'Updates on our medical outreach')
      ON CONFLICT (slug) DO NOTHING;
    `, [cat1Id, cat2Id]);

    // 5. Create Sample Post
    console.log('Creating sample blog post...');
    await client.query(`
      INSERT INTO public.posts (title, slug, content, excerpt, author_id, status, published_at)
      VALUES (
        'Our Impact in 2025', 
        'impact-2025', 
        '<p>This year has been incredible. We have reached over 10,000 children with new learning materials.</p>', 
        'A summary of our achievements and milestones in the past year.',
        $1,
        'published',
        NOW()
      )
      ON CONFLICT (slug) DO NOTHING;
    `, [adminId]);

    console.log('Seeding completed successfully!');
    console.log('\n--- TEST CREDENTIALS ---');
    console.log(`Email: ${adminEmail}`);
    console.log('Password: (You must sign up with this email on the website first)');
    console.log('-------------------------');

  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await client.end();
  }
}

seedAdmin();
