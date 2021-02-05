import { Request, Response } from "express";
import selectUserById from "../data/selectUserById";
import { getTokenData } from "../services/authenticator";
import { User } from "../types/types";

export default async function getUserById(
  req: Request, res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization as string;
   
    getTokenData(token);
	
    const id = req.params.id;

    const user = await selectUserById(id);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email
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

    if(message === "Cannot read property 'id' of undefined"){
      res.statusCode = 404;
      message = "User not found";
    }

    res.send({message});
  }
}