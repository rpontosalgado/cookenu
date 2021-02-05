import { connection } from "..";
import { Recipes } from "../types/types";

export default async function selectAllRecipes (): Promise<Recipes> {
  try {
    const result = await connection("cookenu_recipes as r")
      .select(
        "r.id",
        "r.title",
        "r.description",
        "r.created_at",
        "r.user_id",
        "u.name"
      )
      .join("cookenu_users as u", "r.user_id", "u.id");

    const recipes = result.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      createdAt: item.created_at,
      userId: item.user_id,
      userName: item.name
    }));

    return recipes

  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}