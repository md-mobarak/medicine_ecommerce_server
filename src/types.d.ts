// types.d.ts
import { Request } from "express";
import { Secret } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Change 'any' to your actual user type
    }
  }
}