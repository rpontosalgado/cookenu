import { Request, Response } from "express";
import selectUserByEmail from "../data/selectUserByEmail";
import { updateUserPassword } from "../data/updateUserPassword";
import { hash } from "../services/hashManager";
import { writeMail } from "../services/mailer";

export default async function resetPassword (req: Request, res: Response) {
  try {
    const {email} = req.body;

    if (!email) {
      throw new Error("Invalid email");
    }

    const user = await selectUserByEmail(email);

    if (!user) {
      res.statusCode = 404;
      throw new Error("User not found")
    }

    const password = Math.random().toString(36).substring(2, 8);;
    const hashPassword = await hash(password);

    const PasswordUpdateData = {
      id: user.id,
      newPassword: hashPassword
    }

    await updateUserPassword(PasswordUpdateData);

    await writeMail(
      "Roberto de Abreu Salgado <roberto@gmail.com.br>",
      `${user.email}`,
      "Resetar senha",
      `Oi, ${user.name}. Sua senha foi redefinida`,
      `<p>Oi, ${user.name}. Sua nova senha é ${password}</p>`
    );

    res.status(200).send({message: "Password updated successfully"});

  } catch (error) {
    res.statusCode = 400;
    let { message } = error;
    
    if (message === "Cannot read property 'id' of undefined") {
      res.statusCode = 404;
      message = "User not found";
    }

    res.send({message});
  }
}