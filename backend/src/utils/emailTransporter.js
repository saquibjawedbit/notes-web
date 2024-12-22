import nodemailer from 'nodemailer';

const sendEmail = async (mailOptions) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 465,
        secure: process.env.SMTP_SECURE === 'true' || true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    


    const sendMessage = async (message) => {
        await transporter.sendMail(message);
    }

    await sendMessage(mailOptions);
};

export default sendEmail;