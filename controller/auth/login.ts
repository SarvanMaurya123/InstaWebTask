import { Request, Response } from "express";
import { loginService } from "../../services/auth/login";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../config/cookies";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await loginService(
      email,
      password
    );

    // 🔥 set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};