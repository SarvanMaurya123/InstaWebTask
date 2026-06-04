import { Request, Response } from "express";

export const logout = async (
  req: Request,
  res: Response
) => {
  res.clearCookie("accessToken");

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};