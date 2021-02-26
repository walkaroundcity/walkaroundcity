import nodemailer from "nodemailer"
import mockTransport from "preview-email"

type Email = {
    to: string
    html: string
    text?: string
}

export const sendMail = (data: Email) => {
    const msg = { ...data, from: process.env.EMAIL_FROM }
    if (process.env.NODE_ENV === "production") {
        const smtpTransport = nodemailer.createTransport(process.env.EMAIL_SERVER)
        return smtpTransport.sendMail(msg)
    }
    return mockTransport(msg)
}
