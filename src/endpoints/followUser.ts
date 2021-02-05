import { Request, Response } from "express";
import insertFollowedUser from "../data/insertFollowedUser";
import { AuthenticationData, getTokenData } from "../services/authenticator";
import { UsersRelation } from "../types/types";

export default async function followUser (
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const { userToFollowId } = req.body;

    if (!userToFollowId) {
      res.statusCode = 406;
      throw new Error("User to follow id required");
    }

    if (authenticationData.id === userToFollowId) {
      res.statusCode = 406;
      throw new Error("Cannot follow own profile");
    }

    const inputToFollowUser: UsersRelation = {
      userId: authenticationData.id,
      followedUserId: userToFollowId
    };

    await insertFollowedUser(inputToFollowUser);

    res.status(200).send({
      message: "Followed successfully"
    });

  } catch (error) {
    let { message } = error;

    if (
      message === "jwt must be provided" ||
      message === "invalid signature" ||
      message === "jwt expired" ||
      message === "invalid token" ||
      message === "Cannot read property 'id' of undefined"
    ) {
      res.statusCode = 401;
      message = "Unauthorized";
    }

    if (message.includes("Duplicate entry")) {
      res.statusCode = 406;
      message = "Already following user";
    }

    if (message.includes("a foreign key constraint fails")) {
      res.statusCode = 404;
      message = "User not found";
    }

    res.send({message});
  }
}