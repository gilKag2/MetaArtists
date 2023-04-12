import bcrypt from 'bcrypt';

const validateUserPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const convertUserObject = (user, isGoogleUser = false) => {
  return { id: user.id, userName: user.userName, isGoogleUser };
};

export { validateUserPassword, hashPassword, convertUserObject };