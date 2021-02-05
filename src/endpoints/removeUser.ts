import { Request, Response } from "express";
import deleteAllUserRecipes from "../data/deleteAllUserRecipes";
import deleteAllUserRelations from "../data/deleteAllUserRelations";
import deleteUser from "../data/deleteUser";
import selectUserById from "../data/selectUserById";
import { AuthenticationData, getTokenData } from "../services/authenticator";
import { User, USER_ROLES } from "../types/types";

export default async function removeUser(
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const userId: string = req.params.id;

    const user: User = await selectUserById(userId);

    if (
      authenticationData.role === USER_ROLES.NORMAL &&
      authenticationData.id !== user.id
    ) {
      res.statusCode = 401;
      throw new Error("Unauthorized");
    }

    await deleteAllUserRelations(userId);

    await deleteAllUserRecipes(userId);

    await deleteUser(userId);

    res.status(200).send({
      message: "User removed successfully"
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
      message = "User not found";
    }

    res.send({message});
  }
}