// import nodemailer from 'nodemailer';

// interface EmailOptions {
//   email: string;
//   subject: string;
//   message: string;
// }

// const sendEmail = async (options: EmailOptions): Promise<void> => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: parseInt(process.env.EMAIL_PORT as string, 10),
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: 'Your Company <noreply@yourcompany.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;
