import { connection } from "..";
import { UsersRelation } from "../types/types";

export default async function selectUsersRelation (
  inputToFollowUser: UsersRelation
): Promise<UsersRelation> {
  try {
    const result = await connection("cookenu_users_relations")
    .select('*')
    .where('user_id', inputToFollowUser.userId)
    .andWhere('followed_user_id', inputToFollowUser.followedUserId);

    return {
      userId: result[0].user_id,
      followedUserId: result[0].followed_user_id
    };
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}