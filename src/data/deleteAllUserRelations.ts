import { connection } from "..";

export default async function deleteAllUserRelations (
  id: string
): Promise<void> {
  try {
    await connection("cookenu_users_relations")
      .where('user_id', id)
      .del();
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}