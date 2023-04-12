import { app } from '../../app';
import { User, GoogleUser } from '../../mongodb/models';
import request from 'supertest';
import { convertUserObject } from '../../utils/auth';
import { sign } from 'jsonwebtoken';


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

  // describe('POST /googleAuth', () => {

  //   it('should return 400 if no token is provided', async () => {
  //     await request(app)
  //       .post('/googleAuth')
  //       .send({})
  //       .expect(400);
  //   });

  //   it('should return 200 and user data if user already exists', async () => {
  //     const userData = {
  //       userName: 'John Doe',
  //       email: 'john.doe@gmail.com',
  //       googleId: '12345',
  //     };
  //     jest.spyOn(GoogleUser, 'findOne').mockResolvedValue(userData);

  //     const tokenPayload = {
  //       sub: userData.googleId,
  //       name: userData.userName,
  //       email: userData.email,
  //     };
  //     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  //     const res = await request(app)
  //       .post('/googleAuth')
  //       .send({ token })
  //       .expect(200);

  //     expect(res.body.userName).toBe(userData.userName);
  //     expect(res.body.id).toBeDefined();
  //     expect(res.body.isGoogleUser).toBe(true);

  //   });

  //   it('should return 201 and user data if user is created successfully', async () => {
  //     const userData = {
  //       userName: 'John Doe',
  //       email: 'john.doe@gmail.com',
  //       googleId: '12345',
  //     };
  //     jest.spyOn(GoogleUser, 'findOne').mockResolvedValue(null);
  //     jest.spyOn(GoogleUser, 'create').mockResolvedValue(userData);

  //     const tokenPayload = {
  //       sub: userData.googleId,
  //       name: userData.userName,
  //       email: userData.email,
  //     };
  //     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  //     const response = await request(app)
  //       .post('/googleAuth')
  //       .send({ token });

  //     expect(response.status).toBe(201);
  //     expect(response.body).toEqual({
  //       name: userData.userName,
  //       email: userData.email,
  //       id: userData.googleId,
  //     });
  //   });

  //   it('should return 500 if an error occurs during database interaction', async () => {
  //     jest.spyOn(GoogleUser, 'findOne').mockImplementation(() => {
  //       throw new Error('Database error');
  //     });

  //     const tokenPayload = {
  //       sub: '12345',
  //       name: 'John Doe',
  //       email: 'john.doe@gmail.com',
  //     };
  //     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  //     const response = await request(app)
  //       .post('/googleAuth')
  //       .send({ token });

  //     expect(response.status).toBe(500);
  //   });
  // });
});
