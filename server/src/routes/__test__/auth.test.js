import { app } from '../../app';
import { User } from '../../mongodb/models';
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

  const registerUser = async () => {
    return await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(201);
  };

  describe('POST /register', () => {
    it('should create a new user', async () => {
      const res = await registerUser();

      const createdUser = await User.findOne({ email: newUser.email });

      expect(createdUser.email).toBe(newUser.email);
      expect(createdUser.password).not.toBe(newUser.password); // make sure that the password is hashed
      expect(res.body.userName).toBe(newUser.userName);
      expect(res.body.id).toBeDefined();
      expect(res.body.isGoogleUser).toBe(false);
    });

    it('should not create a user with duplicate email', async () => {
      await User.create(newUser);

      await request(app)
        .post('/auth/register')
        .send(newUser)
        .expect(403);
    });
  });

  describe('POST /login', () => {
    it('should login a user with valid credentials', async () => {
      await registerUser();

      const res = await request(app)
        .post('/auth/login')
        .send({ email: newUser.email, password: newUser.password })
        .expect(200);

      expect(res.body.userName).toBe(newUser.userName);
      expect(res.body.id).toBeDefined();
      expect(res.body.isGoogleUser).toBe(false);

    });

    it('should not login a user with invalid credentials', async () => {
      await request(app)
        .post('/auth/login')
        .send({ email: newUser.email, password: 'wrongPassword' })
        .expect(550);
    });

    it('should return an error if email or password is missing', async () => {
      await request(app)
        .post('/auth/login')
        .send({ email: newUser.email })
        .expect(400);
    });
  });

});
