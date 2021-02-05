import { connection } from ".."
import { RecipeUpdate } from "../types/types";

export default async function updateRecipe(
  input: RecipeUpdate
): Promise<void> {
  try {
    const { id, title, description } = input;

    await connection("cookenu_recipes")
      .where({ id })
      .update({
        title,
        description
      });
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}