import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../config/cookies";

import { loginService } from "../../services/auth/login";
import { generateAccessToken, generateRefreshToken } from "../../config/jwt";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user } = await loginService(email, password);

    // 🔥 generate tokens HERE
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      role: user.role,
    });

    //set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};