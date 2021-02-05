import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import express from "express";
import { AddressInfo } from "net";
import signup from "./endpoints/signup";
import login from "./endpoints/login";
import getUserByToken from "./endpoints/getUserByToken";
import getUserById from "./endpoints/getUserById";
import createRecipe from "./endpoints/createRecipe";
import getRecipeById from "./endpoints/getRecipeById";
import followUser from "./endpoints/followUser";
import unfollowUser from "./endpoints/unfollowUser";
import getRecipeFeed from "./endpoints/getRecipeFeed";
import editRecipe from "./endpoints/editRecipe";
import removeRecipe from "./endpoints/removeRecipe";
import removeUser from "./endpoints/removeUser";
import resetPassword from "./endpoints/resetPassword";

dotenv.config();

export const connection = knex({
  client: 'mysql',
  connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3306
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', signup);
app.post('/login', login);

app.get("/user/profile", getUserByToken);
app.get("/user/feed", getRecipeFeed);
app.get("/user/:id?", getUserById);
app.post("/user/follow", followUser);
app.post("/user/unfollow", unfollowUser);
app.post("/user/password/reset", resetPassword)
app.delete("/user/remove/:id?", removeUser);

app.post("/recipe", createRecipe);
app.get("/recipe/:id?", getRecipeById);
app.put("/recipe/edit/:id?", editRecipe);
app.delete("/recipe/remove/:id?", removeRecipe);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});