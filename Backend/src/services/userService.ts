import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (input: RegisterInput) => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("email")
    .eq("email", input.email)
    .single();

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(input.password, salt);

  const { data: newUser, error } = await supabase
    .from("users")
    .insert([
      {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

export const loginUser = async (email: string, password: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
