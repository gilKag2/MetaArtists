import { app } from '../../app';
import User from '../../mongodb/models/user';
import request from 'supertest';


describe('User Registration and Login', () => {
  let newUser;
  beforeEach(() => {
    newUser = {
      userName: 'testUser',
      email: 'test@example.com',
      password: 'test1234'
    };
  });

  describe('POST /register', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(newUser)
        .expect(201);

      const createdUser = await User.findOne({ email: newUser.email });
      expect(createdUser.email).toBe(newUser.email);
      expect(createdUser.password).toBe(newUser.password);
    });

    it('should not create a user with duplicate email', async () => {
      await User.create(newUser);

      const res = await request(app)
        .post('/auth/register')
        .send(newUser)
        .expect(403);
    });
  });

  describe('POST /login', () => {
    it('should login a user with valid credentials', async () => {
      await User.create(newUser);

      const res = await request(app)
        .post('/auth/login')
        .send({ email: newUser.email, password: newUser.password })
        .expect(202);

      expect(res.body.email).toBe(newUser.email);
      expect(res.body.password).not.toBe(newUser.password);
    });

    it('should not login a user with invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: newUser.email, password: 'wrongPassword' })
        .expect(550);
    });

    it('should return an error if email or password is missing', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: newUser.email })
        .expect(400);

      expect(res.body).toEqual({});
    });
  });
});
