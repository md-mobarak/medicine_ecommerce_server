import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../modules/user/userModel';

interface AuthRequest extends Request {
  user?: IUser;
}

export const protect: RequestHandler = async (req, res, next): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized to access this resource' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized to access this resource' });
  }
};

export const authorize = (...roles: Array<IUser['role']>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user?.role as IUser['role'])) {
      res.status(403).json({ success: false, message: `User role ${req.user?.role} is not authorized to access this resource` });
      return;
    }
    next();
  };
};
