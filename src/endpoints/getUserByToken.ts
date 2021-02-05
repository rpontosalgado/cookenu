import { Request, Response } from "express";
import selectUserById from "../data/selectUserById";
import { AuthenticationData, getTokenData } from "../services/authenticator";

export default async function getUserByToken(
  req: Request, res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const user = await selectUserById(authenticationData.id);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    res.statusCode = 400;
    let { message } = error;

    if (
      message === "jwt must be provided" ||
      message === "invalid signature" ||
      message === "jwt expired" ||
      message === "Cannot read property 'id' of undefined"
    ) {
      res.statusCode = 401;
      message = "Unauthorized";
    }

    res.send({message});
  }
}