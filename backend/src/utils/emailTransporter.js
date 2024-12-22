import nodemailer from 'nodemailer';

const sendEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: process.env.SMTP_PORT || 465,
            secure: process.env.SMTP_SECURE === 'true' || true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email Error:", error);
                resolve(false); // or reject(error) if you want to handle errors
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    });
};

export default sendEmail;