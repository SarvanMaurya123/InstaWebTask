import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/user";

export const protect = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as {
      userId: string;
      role: string;
    };

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
      code: "TOKEN_EXPIRED",
    });
  }
};