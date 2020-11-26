import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { CreateTransportOptions, SendEmailOptions } from './types';

/**
 * Postman - Send email
 */
export class Postman {

  private transporter: Mail;
  private user: string;

  constructor(options: CreateTransportOptions) {
    this.transporter = createTransport(options);
    this.user = options.auth.user;
  }

  /**
   * Send email
   *
   * options: `SendEmailOptions`
   */
  async send(options: SendEmailOptions) {

    const { to, subject, html } = options;

    try {

      const result = await new Promise(
        (resolve, rej) => {
          this.transporter.sendMail(
            { to, subject, html, from: this.user },
            (error: Error, info) => { error ? rej(error) : resolve(info) },
          );
        },
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * close server
   *
   * options: `SendEmailOptions`
   */
  async close() {
    this.transporter.close();
  }

}
