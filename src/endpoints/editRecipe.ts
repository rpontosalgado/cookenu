import { Request, Response } from "express";
import selectRecipeById from "../data/selectRecipeById";
import updateRecipe from "../data/updateRecipe";
import { AuthenticationData, getTokenData } from "../services/authenticator";
import { Recipe, RecipeUpdate, USER_ROLES } from "../types/types";

export default async function editRecipe(
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const recipeId: string = req.params.id;

    const {title, description} = req.body;

    if (!title && !description) {
      res.statusCode = 406;
      throw new Error("'title' or 'description' required");
    }

    const recipe: Recipe = await selectRecipeById(recipeId);

    if (
      authenticationData.role === USER_ROLES.NORMAL &&
      authenticationData.id !== recipe.userId
    ) {
      res.statusCode = 401;
      throw new Error("Unauthorized");
    }

    const updateRecipeInput: RecipeUpdate = {
      id: recipeId,
      title,
      description
    };

    await updateRecipe(updateRecipeInput);

    res.status(200).end();

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