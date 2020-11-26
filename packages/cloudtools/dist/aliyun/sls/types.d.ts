export declare type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export interface SLSOptions {
    endpoint: string;
    apiVersion: string;
    project: string;
    logStore: string;
    accessKeyId: string;
    secretAccessKey: string;
}
