import { Request, Response } from "express";
import { verifyRefreshToken } from "../../config/jwt";
import user from "../../schema/user";

export const logout = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  if (userId) {
    const userData = await user.findById(userId);

    if (userData) {
      userData.refreshToken = null; // kill session
      await userData.save();
    }
  }

  res.clearCookie("accessToken");

  return res.status(200).json({
    success: true,
    message: "Logged out",
  });
};