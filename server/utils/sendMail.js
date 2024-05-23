import nodemailer from "nodemailer";
import config from "config"

let {HOST,AUTH}=config.get("EMAIL_SMTP")
async function sendMail(emailData){
    try {
        const transporter = nodemailer.createTransport({
            host: HOST,
            port: 465,
            secure: true, 
            auth: {
              user: AUTH.USER,
              pass: AUTH.PASS,
            },
          });
          const info = await transporter.sendMail({
            from: '"Tasky App" <numan@inuman.dev>', 
            to: emailData.to, 
            subject:emailData.subject,
            text: "Hello world?", 
            html: emailData.body, 
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);  
    }
}
export default sendMail;