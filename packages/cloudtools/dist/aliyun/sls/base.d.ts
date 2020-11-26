import { SLSOptions } from './types';
/**
 * SimpleLogge
 */
export declare class SimpleLogger {
    info(value: string): void;
    error(value: string): void;
    debug(value: string): void;
    fatal(value: string): void;
    trace(value: string): void;
    warn(value: string): void;
}
/**
 * Common methods of packaging aliyun SLS log service
 */
export declare class SLSLogger {
    private readonly topic;
    private readonly options;
    private logger;
    constructor(topic: string, options: SLSOptions);
    info(value: string, source?: string): Promise<void>;
    error(value: string, source?: string): Promise<void>;
    debug(value: string, source?: string): Promise<void>;
    fatal(value: string, source?: string): Promise<void>;
    trace(value: string, source?: string): Promise<void>;
    warn(value: string, source?: string): Promise<void>;
    private handle;
}
