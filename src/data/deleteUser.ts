import { connection } from "..";

export default async function deleteUser (
  id: string
): Promise<void> {
  try {
    await connection("cookenu_users")
      .where({ id })
      .del();
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}