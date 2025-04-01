import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: 'deepakdwivedi3211@gmail.com',
        pass: 'fzetsukmwqxrodki',
      },
    });
  }
  async sendPasswordResetEmail(to: string, token: string) {
    const resetlink = `http://localhost:8000/auth/reset-password?token=${token}`;
    const mailoptional = {
      from: process.env.EMAIL,
      to: to,
      subject: 'password reset request',
      html: `<p>You requested a password reset. Click the link below to reset your a  password:</p><p><a href="${resetlink}">Reset Password</a></p> `,
    };
    await this.transporter.sendMail(mailoptional);
  }
}
