import request from 'supertest';
import app from '../src/app';
import { UserRepository } from '../src/repository/user.repository';

describe('Auth flow', () => {
  let token = '';
  const testEmail = 'test_user_for_ci@example.com';

  beforeAll(() => {
    // Mock repository methods to avoid real DB interactions
    // Initially, findByEmail returns null to simulate non-existing user for registration
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockImplementation(async (email: string) => null as any);
    jest.spyOn(UserRepository.prototype, 'create').mockImplementation(async (data: any) => {
      return { id: 1000, ...data } as any;
    });
    jest.spyOn(UserRepository.prototype, 'findAll').mockImplementation(async () => {
      return [ { id: 999, name: 'Test CI', email: testEmail, role: 'ADMIN' } as any ];
    });
  });

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test CI', email: testEmail, password: 'Test1234', role: 'ADMIN' });
    expect([200,201]).toContain(res.status);
    expect(res.body).toHaveProperty('id');
  });

  it('logs in the user', async () => {
    // also mock bcrypt.compare to return true
    jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);
    // Now make findByEmail return the created user for login
    (UserRepository.prototype.findByEmail as jest.Mock).mockImplementationOnce(async (email: string) => ({ id: 999, name: 'Test CI', email: testEmail, password: '$2a$10$hash', role: 'ADMIN' } as any));

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'Test1234' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('gets users (requires ADMIN)', async () => {
    const res = await request(app)
      .get('/api/auth/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
