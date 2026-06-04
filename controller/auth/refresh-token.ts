import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../../config/cookies";
import { refreshTokenService } from "../../services/auth/refresh-token";
import { Request, Response } from "express";
export const refreshToken = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken =
      req.cookies.refreshToken;
      console.log("Received refresh token:", refreshToken);

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const {
      newAccessToken,
      newRefreshToken,
    } = await refreshTokenService(
      refreshToken
    );

    res.cookie(
      "accessToken",
      newAccessToken,
      accessTokenCookieOptions
    );

    res.cookie(
      "refreshToken",
      newRefreshToken,
      refreshTokenCookieOptions
    );

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