import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/user";

export const protect = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Cookies:", req.cookies);

    const token = req.cookies.accessToken;

    console.log("Token:", token ? "FOUND" : "MISSING");

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    );

    console.log("Decoded:", decoded);

    next();
  } catch (error: any) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
      code: "TOKEN_EXPIRED",
    });
  }
};