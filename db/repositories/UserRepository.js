import { getDb } from '../index.js';

class UserRepository {
  constructor() {
    // This is database-agnostic because it uses Knex query builder
  }

  formatTableName(table) {
    const db = getDb();
    const client = db.client.config.client;
    
    // MySQL and MariaDB don't support schemas in the same way as PostgreSQL
    if (client === 'mysql2') {
      return table.replace('public.', '').replace('auth.', '');
    }
    return table;
  }

  async findByEmail(email) {
    const db = getDb();
    return await db(this.formatTableName('auth.users'))
      .where({ email })
      .first();
  }

  async findById(id) {
    const db = getDb();
    return await db(this.formatTableName('auth.users'))
      .where({ id })
      .first();
  }

  async create(userData) {
    const db = getDb();
    const [id] = await db(this.formatTableName('auth.users'))
      .insert(userData)
      .returning('id');
    
    return id;
  }

  async updatePassword(id, hashedPassword) {
    const db = getDb();
    return await db(this.formatTableName('auth.users'))
      .where({ id })
      .update({ password_hash: hashedPassword });
  }

  async getRoles(userId) {
    const db = getDb();
    const roles = await db(this.formatTableName('public.user_roles'))
      .where({ user_id: userId })
      .select('role');
    
    return roles.map(r => r.role);
  }

  async addAuditLog(logData) {
    const db = getDb();
    return await db(this.formatTableName('public.audit_logs'))
      .insert({
        ...logData,
        created_at: db.fn.now()
      });
  }
}

export default new UserRepository();
