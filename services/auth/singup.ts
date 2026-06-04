import bcrypt from "bcryptjs";
import User from "../../schema/user";
interface SignupData {
  name: string;
  email: string;
  password: string;
}

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../config/jwt";

export const signupService = async ({
  name,
  email,
  password,
}: SignupData) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const refreshToken = generateRefreshToken({
    userId: "temp",
    role: "USER",
  });

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    refreshToken,
  });

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return { user, accessToken, refreshToken };
};