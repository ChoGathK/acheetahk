/**
 * Create postman
 *
 * host: `string` SMTP server host
 *
 * port: `number` SMTP server port
 *
 * auth.user: `string` Email address for sending mail
 *
 * auth.pass: `string` Email password for sending mail
 */
export interface CreateTransportOptions {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

/**
 * Send email
 *
 * to: `string` Recipient email address
 *
 * subject: `string` Email Subject
 *
 * html: `string` Email body
 */
export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}
