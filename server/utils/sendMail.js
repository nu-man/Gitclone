import nodemailer from "nodemailer";

async function sendMail(){
    try {
        const transporter = nodemailer.createTransport({
            host: "mail.inuman.dev",
            port: 465,
            secure: true, 
            auth: {
              user: "numan@inuman.dev",
              pass: "Numan@1234",
            },
          });
          const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <numan@inuman.dev>', // sender address
            to: "mohdnuman198@gmail.com", // list of receivers
            subject: "nodemailer sent this", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);  
    }
}
sendMail()