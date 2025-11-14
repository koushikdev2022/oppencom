const dotEnv = require("@dotenvx/dotenvx")
dotEnv.config();
const nodemailer = require('nodemailer');

const mailConfig = async () => {
    let config = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587, 
        secure: process.env.SMTP_PORT == 465, 
        auth: {
            user: process.env.SMTP_SENDER_MAIL,
            pass: process.env.SMTP_PASS
        }
    };
    // console.log(config);
    return nodemailer.createTransport(config);
};


module.exports = { mailConfig }