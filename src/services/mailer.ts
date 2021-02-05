import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const config: SMTPTransport.Options = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b7d569603deb5d",
    pass: "37da30cde080e9"
  }
}

const transporter = nodemailer.createTransport(config);

export async function writeMail(
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string){

    const mailContent: Mail.Options = {
      from,
      to,
      subject,
      text,
      html
    }

    transporter.sendMail(mailContent, (error: Error | null, info: any)=>{
      if(error){
        throw new Error(error.message);
      } else {
        console.log("E-mail envido");
      }
    });

  } 
