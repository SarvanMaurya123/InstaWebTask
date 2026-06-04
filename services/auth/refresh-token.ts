import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../config/jwt";
import User from "../../schema/user";

export const refreshTokenService = async (
  refreshToken: string
) => {
  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    newAccessToken,
    newRefreshToken,
    user,
  };
};