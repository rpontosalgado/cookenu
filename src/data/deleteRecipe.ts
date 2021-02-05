import { connection } from ".."

export default async function deleteRecipe(
  id: string 
): Promise<void> {
  try {
    await connection("cookenu_recipes")
      .where({ id })
      .del();
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}