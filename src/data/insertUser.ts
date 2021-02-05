import { connection } from "..";
import { User } from "../types/types";

export default async function insertUser (
  signupData: User
): Promise<void> {
  try {
    await connection("cookenu_users")
    .insert({
      id: signupData.id,
      name: signupData.name,
      email: signupData.email,
      role: signupData.role,
      password: signupData.password,
    });
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}