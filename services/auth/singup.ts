import bcrypt from "bcryptjs";
import User from "../../schema/user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../config/jwt";

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  //  STORE ONLY IN DB (NOT COOKIE)
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};