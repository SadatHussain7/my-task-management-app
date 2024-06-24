import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
