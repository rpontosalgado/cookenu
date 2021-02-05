import { Request, Response } from "express";
import selectRecipeById from "../data/selectRecipeById";
import { formatDateTime } from "../functions/handleDate";
import { getTokenData } from "../services/authenticator";
import { Recipe } from "../types/types";

export default async function getRecipeById(
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    getTokenData(token);
	
    const id: string = req.params.id;

    const recipe: Recipe = await selectRecipeById(id);

    res.status(200).send({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      createdAt: formatDateTime(recipe.createdAt)
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

    if (message === "Cannot read property 'id' of undefined") {
      res.statusCode = 404;
      message = "Recipe not found";
    }

    res.send({message});
  }
}