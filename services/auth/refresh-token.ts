import User from "../../schema/user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../config/jwt";

export const refreshTokenService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user || !user.refreshToken) {
    throw new Error("Invalid session");
  }

  //  verify stored refresh token (you must verify JWT here)
  const refreshToken = user.refreshToken;

  // optional: verifyRefreshToken(refreshToken)

  const newAccessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  // rotate refresh token in DB
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    newAccessToken,
  };
};