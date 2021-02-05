import { connection } from "..";

export default async function deleteAllUserRecipes (
  id: string
): Promise<void> {
  try {
    await connection("cookenu_recipes")
      .where('user_id', id)
      .del();
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}