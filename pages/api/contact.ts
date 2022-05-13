import { NextApiRequest, NextApiResponse } from "next";
require('dotenv').config()

export default function (req: NextApiRequest, res: NextApiResponse) {
  let nodemailer = require('nodemailer')
  const PASSWORD = process.env.PASSWORD
  const USER = process.env.USER

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: USER,
      pass: PASSWORD,
    },
    secure: true,
  })

    const mailData = {
    from: "flights-blog@noreply.com",
    to: USER,
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: `<div>
    <h2>Email:</h2>
    ${req.body.email}
    <h2>Message:</h2>
    ${req.body.message}
    </div>`
   }

   transporter.sendMail(mailData, function (err:any, info:any) {
  if(err)
    throw err
  else
    console.log(info)
})
}