import { connection } from "..";
import { UsersRelation } from "../types/types";

export default async function deleteFollowedUser (
  inputToFollowUser: UsersRelation
): Promise<void> {
  try {
    await connection("cookenu_users_relations")
      .where('user_id', inputToFollowUser.userId)
      .andWhere('followed_user_id', inputToFollowUser.followedUserId)
      .del();
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}