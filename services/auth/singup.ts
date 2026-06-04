import bcrypt from "bcryptjs";
import User from "../../schema/user";
interface SignupData {
  name: string;
  email: string;
  password: string;
}

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

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};