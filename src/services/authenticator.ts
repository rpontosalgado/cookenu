import * as jwt from "jsonwebtoken";
import { USER_ROLES } from "../types/types";

export type AuthenticationData = {
  id: string,
  role: USER_ROLES
}

const expiresIn = "10min";

export function generateToken(input: AuthenticationData): string {
  return jwt.sign(
    {
      id: input.id,
      role: input.role
    },
    process.env.JWT_KEY as string,
    {
      expiresIn
    }
  );
}

export function getTokenData(
  token: string
): AuthenticationData {
  return jwt.verify(
    token,
    process.env.JWT_KEY as string
  ) as AuthenticationData
}