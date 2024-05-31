import nodemailer from "nodemailer";
import EnvVariables from "../constants.js";
const { COMPANY_EMAIL, EMAIL_PASS, EMAIL_SERVICE, SMTP_PORT, SMTP_HOST } = EnvVariables;


const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            host: SMTP_HOST,
            port: SMTP_PORT,
            logger:true , 
            secure: false, // true for 465, false for other ports
            auth: {
                user: COMPANY_EMAIL,
                pass: EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: true // Change to true in production
            }
        });
        var mailOptions = {
            from: COMPANY_EMAIL, // sender address
            to: options.sendTo, // list of receivers
            subject: options.subject, // Subject line
            text: options.text, // plain text body
            // html: options.html, // html body
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        // console.log(mailOptions , COMPANY_EMAIL ,EMAIL_PASSWORD);

        console.error("Error sending email:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

export default sendEmail;
