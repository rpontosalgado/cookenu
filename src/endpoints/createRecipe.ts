import { Request, Response } from "express";
import { AuthenticationData, getTokenData } from "../services/authenticator";
import generateId from "../services/idGenerator";
import { Recipe } from "../types/types";
import insertRecipe from "../data/insertRecipe";

export default async function createRecipe(
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const {title, description} = req.body;

    if (!title || !description) {
      res.statusCode = 406;
      throw new Error("'title' and 'description' required");
    }

    const recipeId: string = generateId();

    const createdAt: Date = new Date();

    const recipeInput: Recipe = {
      id: recipeId,
      title,
      description, 
      createdAt,
      userId: authenticationData.id
    };

    await insertRecipe(recipeInput);

    res.status(201).send({
      title,
      description
    });
  } catch (error) {
    let { message } = error;

    if (
      message === "jwt must be provided" ||
      message === "invalid signature" ||
      message === "jwt expired"
    ) {
      res.statusCode = 401;
      message = "Unauthorized";
    }

    res.send({message});
  }
}