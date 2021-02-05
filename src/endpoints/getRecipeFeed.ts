import { Request, Response } from "express";
import selectAllRecipes from "../data/selectAllRecipes";
import { formatDateTime } from "../functions/handleDate";
import { getTokenData } from "../services/authenticator";
import { Recipes } from "../types/types";

export default async function getRecipeFeed(
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    getTokenData(token);

    const recipes: Recipes = await selectAllRecipes();

    res.status(200).send({
      recipes: recipes.map(recipe => ({
        ...recipe,
        createdAt: formatDateTime(recipe.createdAt)
      }))
    });

  } catch (error) {
    let { message } = error;

    if (
      message === "jwt must be provided" ||
      message === "invalid signature" ||
      message === "jwt expired" ||
      message === "invalid token"
    ) {
      res.statusCode = 401;
      message = "Unauthorized";
    }

    res.send({message});
  }
}