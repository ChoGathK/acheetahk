"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postman = void 0;
const nodemailer_1 = require("nodemailer");
/**
 * Postman - Send email
 */
class Postman {
    constructor(options) {
        this.transporter = nodemailer_1.createTransport(options);
        this.user = options.auth.user;
    }
    /**
     * Send email
     *
     * options: `SendEmailOptions`
     */
    async send(options) {
        const { to, subject, html } = options;
        try {
            const result = await new Promise((resolve, rej) => {
                this.transporter.sendMail({ to, subject, html, from: this.user }, (error, info) => { error ? rej(error) : resolve(info); });
            });
            return result;
        }
        catch (error) {
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
exports.Postman = Postman;
//# sourceMappingURL=base.js.map