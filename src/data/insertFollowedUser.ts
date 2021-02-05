import { connection } from "..";
import { UsersRelation } from "../types/types";

export default async function insertFollowedUser (
  inputToFollowUser: UsersRelation
): Promise<void> {
  try {
    await connection("cookenu_users_relations")
    .insert({
      user_id: inputToFollowUser.userId,
      followed_user_id: inputToFollowUser.followedUserId
    });
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}