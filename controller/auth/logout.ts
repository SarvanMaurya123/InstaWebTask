import { Request, Response } from "express";
import { verifyRefreshToken } from "../../config/jwt";
import user from "../../schema/user";

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);

    const User = await user.findById(decoded.userId);

    if (User) {
      User.refreshToken = null; // 🔥 kill session
      await User.save();
    }
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};