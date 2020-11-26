import { CreateTransportOptions, SendEmailOptions } from './types';
/**
 * Postman - Send email
 */
export declare class Postman {
    private transporter;
    private user;
    constructor(options: CreateTransportOptions);
    /**
     * Send email
     *
     * options: `SendEmailOptions`
     */
    send(options: SendEmailOptions): Promise<unknown>;
    /**
     * close server
     *
     * options: `SendEmailOptions`
     */
    close(): Promise<void>;
}
