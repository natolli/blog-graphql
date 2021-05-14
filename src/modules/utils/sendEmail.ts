import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  console.log(process.env.GMAIL_USERNAME);
  console.log(process.env.GMAIL_PASSWORD);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: '"DEEP " <natolilemma1@example.com>',
    to: email,
    subject: "Confirm email or change password (DEEP)",
    text: "Hello, ",
    html: `<a href="${url}">${url}</a>`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
}
