import { Request, Response } from "express";
import { loginService } from "../../services/auth/login";
import { accessTokenCookieOptions } from "../../config/cookies";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken } = await loginService(email, password);

    // 🔥 ONLY accessToken in cookie
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

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