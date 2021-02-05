import { Request, Response } from "express";
import deleteFollowedUser from "../data/deleteFollowedUser";
import selectUsersRelation from "../data/selectUsersRelation";
import { AuthenticationData, getTokenData } from "../services/authenticator";
import { UsersRelation } from "../types/types";

export default async function unfollowUser (
  req: Request, res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization as string;
   
    const authenticationData: AuthenticationData = getTokenData(token);

    const { userToUnfollowId } = req.body;

    if (!userToUnfollowId) {
      res.statusCode = 406;
      throw new Error("User to unfollow id required");
    }

    if (authenticationData.id === userToUnfollowId) {
      res.statusCode = 406;
      throw new Error("Cannot unfollow own profile");
    }

    const inputToUnfollowUser: UsersRelation = {
      userId: authenticationData.id,
      followedUserId: userToUnfollowId
    };

    const usersRelation: UsersRelation
      = await selectUsersRelation(inputToUnfollowUser);

    if (!usersRelation) {
      res.statusCode = 404;
      throw new Error("Not following user or user not found")
    }

    await deleteFollowedUser(inputToUnfollowUser);

    res.status(200).send({
      message: "Unfollowed successfully"
    });

  } catch (error) {
    let { message } = error;

    if(
      message === "jwt must be provided" ||
      message === "invalid signature" ||
      message === "jwt expired" ||
      message === "invalid token"
    ){
      res.statusCode = 401;
      message = "Unauthorized";
    }

    if (message === "Cannot read property 'user_id' of undefined") {
      res.statusCode = 404;
      message = "Not following user or user not found";
    }

    res.send({message});
  }
}