import { connection } from "..";
import { User } from "../types/types";

export default async function selectUserById (
  id: string = ""
): Promise<User> {
  try {
    const result = await connection("cookenu_users")
      .select("*")
      .where({ id });

    return {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      role: result[0].role,
      password: result[0].password
    };
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}