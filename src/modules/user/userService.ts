import jwt, { Secret } from "jsonwebtoken";
import User, { IUser } from "./userModel";

// Include role in the token


export const registerUser = async (users: IUser): Promise<IUser> => {
  const { name, email, password, photo ,role} = users;
  const user = await User.create({ name, email, password, photo, role }); // Explicit role assignment
  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return null;
  }
     // Calculate a timestamp that is 1 year ago from the current time
     const oneYearAgoTimestamp = Math.floor(Date.now() / 1000) - 31536001; // 1 year + 1 second = 31536001 seconds
     // Generate an access token
     const accessToken = jwt.sign(
       {
         email: email,
         role: user.role,
         userId: user.id,
         iat: oneYearAgoTimestamp,
       },
       process.env.ACCESS_SECRET as Secret,
      //  { expiresIn: "7d" }
     );
 
     const refreshToken = jwt.sign(
       {
         email: email,
         role: user.role,
         userId: user.id,
         iat: oneYearAgoTimestamp,
       },
       process.env.REFRESH_SECRET as Secret,
      //  { expiresIn: "7d" }
     );
  return { user, accessToken , refreshToken };
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
