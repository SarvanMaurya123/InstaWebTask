import { Request, Response } from "express";
import User from "../../schema/user"; // FIXED naming

export const logout = async (req: Request, res: Response) => {
  try {
    /**
     * BEST PRACTICE:
     * get userId from auth middleware (NOT body)
     */
    const userId = (req as any).user?.userId;

    if (userId) {
      const userData = await User.findById(userId);

      if (userData) {
        userData.refreshToken = null; // 🔥 kill session
        await userData.save();
      }
    }

    /**
     *  clear cookie properly
     */
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};