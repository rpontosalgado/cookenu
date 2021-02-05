import { connection } from "..";
import { Recipe } from "../types/types";

export default async function selectRecipeById (
  id: string = ""
): Promise<Recipe> {
  try {
    const result = await connection("cookenu_recipes")
      .select("*")
      .where({ id });

    return {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      createdAt: result[0].created_at,
      userId: result[0].user_id
    };
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}