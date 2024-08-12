import jwt from "jsonwebtoken";
import User, { IUser } from "./userModel";

// Include role in the token
const generateToken = (user: IUser, expiresIn: string): string => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn });
};

export const registerUser = async (users: IUser): Promise<IUser> => {
  const { name, email, password, photo ,role} = users;
  const user = await User.create({ name, email, password, photo, role }); // Explicit role assignment
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string; refreshToken: string } | null> => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return null;
  }

  const token = generateToken(user, process.env.JWT_EXPIRE as string);
  const refreshToken = generateToken(user, process.env.REFRESH_TOKEN_EXPIRE as string);

  return { user, token, refreshToken };
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};
