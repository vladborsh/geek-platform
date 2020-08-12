import { Injectable, NotAcceptableException } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

const MAILER_SERVICE = process.env.MAILER_SERVICE;
const MAILER_LOGIN = process.env.MAILER_LOGIN;
const MAILER_PASSWORD = process.env.MAILER_PASSWORD;

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: MAILER_SERVICE,
      auth: {
        user: MAILER_LOGIN,
        pass: MAILER_PASSWORD,
      },
    });
  }

  public async sendMail(to: string, subject: string, text: string): Promise<void> {
    if (!MAILER_SERVICE) {
      return Promise.resolve();
    }

    try {
      await this.transporter.sendMail({ to, subject, text });
    } catch (err) {
      throw new NotAcceptableException(`Mailer error: ${err}`);
    }
  }
}
