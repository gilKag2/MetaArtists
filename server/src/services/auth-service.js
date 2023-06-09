import bcrypt from 'bcrypt';
import jwt_decode from 'jwt-decode';
import { ServerError, UnauthorizedError, BadRequestError, NoSuchResourceError } from '../errors/index.js';
import { User } from '../mongodb/models/index.js';

class AuthService {
  constructor() { }

  async createUser(userName, email, password) {
    const hashedPassword = await hashPassword(password);
    try {
      const user = await User.create({
        userName,
        email,
        password: hashedPassword
      });
      return convertUserObject(user);
    } catch (e) {
      if (e.code === 11000) {
        throw new UnauthorizedError(e.keyValue);
      }
      console.error(e);
      throw new ServerError('failed to create user');
    }
  }

  async loginUserWithEmailAndPassword(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NoSuchResourceError('no such user');
    }

    const isSamePassword = await validateUserPassword(password, user.password);
    if (!isSamePassword) {
      throw new BadRequestError('password mismatch');
    }
    return convertUserObject(user);
  }

  async authWithGoogle(token) {
    const userObject = jwt_decode(token);
    try {
      const existingUser = await User.findOne({ email: userObject.email });
      if (existingUser) {
        return { isCreated: false, user: convertUserObject(existingUser) };
      }

      // if there is no user, create a new one
      const user = await User.create({
        userName: userObject.name,
        email: userObject.email,
        googleId: userObject.sub
      });
      return { isCreated: false, user: convertUserObject(user) };
    } catch (e) {
      console.log(e);
      throw new ServerError('failed to login user with google');
    }
  }
}

async function validateUserPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
};

function convertUserObject(user, isGoogleUser = false) {
  return { id: user.id, userName: user.userName, isGoogleUser };
};

const authService = new AuthService();

export default authService;
