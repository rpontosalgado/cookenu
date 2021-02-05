import { connection } from "..";
import { Recipe } from "../types/types";

export default async function insertRecipe (
  recipeInput: Recipe
): Promise<void> {
  await connection("cookenu_recipes")
    .insert({
      id: recipeInput.id,
      title: recipeInput.title,
      description: recipeInput.description,
      created_at: recipeInput.createdAt,
      user_id: recipeInput.userId
    });
}