import { NextFunction, RequestHandler } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } from './userService';

export const checkAdminOrSuperAdmin = (req: any, res: any): boolean => {
  if (!req?.headers) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Unauthorized access apnar jayga nai",
      role: req?.user?.role,
    });
    return false;
  }
  const isAdmin = req?.user?.role === "admin";
  const isSuperAdmin = req?.user?.role === "super_admin";

  if (!isAdmin && !isSuperAdmin) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Unauthorized access ata admin",
      role: req?.user?.role,
    });
    return false;
  }

  return true;
};

export const register: RequestHandler = async (req, res) => {
  const { name, email, password, photo } = req.body;

  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    if (!result) {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
      return;
    }

    // Set the refresh token as a cookie in the response
    res.cookie("refreshToken", result?.refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      token: result.accessToken,
      refreshToken: result.refreshToken,
      data: result.user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Login failed.' });
  }
};

export const getAllUsersController: RequestHandler = async (req, res) => {
  try {
    const isAuthorized = checkAdminOrSuperAdmin(req, res);
    if (!isAuthorized) return; // Exit if already responded

    const users = await getAllUsers();
    return res.status(200).json({ success: true, data: users, role: req?.user?.role });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getUserByIdController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateUserController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteUserController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
