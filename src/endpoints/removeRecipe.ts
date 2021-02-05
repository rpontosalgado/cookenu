import { Request, Response } from "express";
import deleteRecipe from "../data/deleteRecipe";
import selectRecipeById from "../data/selectRecipeById";
import { AuthenticationData, getTokenData } from "../services/authenticator";
import { Recipe, USER_ROLES } from "../types/types";

export default async function removeRecipe(
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const recipeId: string = req.params.id;

    const recipe: Recipe = await selectRecipeById(recipeId);

    if (
      authenticationData.role === USER_ROLES.NORMAL &&
      authenticationData.id !== recipe.userId
    ) {
      res.statusCode = 401;
      throw new Error("Unauthorized");
    }

    await deleteRecipe(recipeId);

    res.status(200).send({
      message: "Recipe removed successfully"
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