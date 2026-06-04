import { Request, Response } from "express";
import { accessTokenCookieOptions } from "../../config/cookies";
import { refreshTokenService } from "../../services/auth/refresh-token";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    // NO COOKIE USAGE (IMPORTANT CHANGE)
    const userId = req.body.userId; 
    // OR extract from expired access token middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { newAccessToken } = await refreshTokenService(userId);

    //  ONLY SET ACCESS TOKEN COOKIE
    res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Token refreshed",
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};