export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export type User = {
  id: string,
  name: string,
  email: string,
  role: USER_ROLES,
  password: string,
}

export type Recipe = {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
  userId: string
}

export type Recipes = {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
  userId: string,
  userName: string
}[]

export type RecipeUpdate = {
  id: string,
  title: string,
  description: string
}

export type UsersRelation = {
  userId: string,
  followedUserId: string
}

export type PasswordUpdate = {
  id: string,
  newPassword: string
}