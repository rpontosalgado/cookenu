import {connection} from "..";
import { PasswordUpdate } from "../types/types";

export async function updateUserPassword(
  passwordUpdateData: PasswordUpdate
): Promise<void> {
  try {
    const {id, newPassword} = passwordUpdateData;

    await connection("cookenu_users")
      .update({ password: newPassword })
      .where({ id });
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
}