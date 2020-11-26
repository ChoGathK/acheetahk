"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLSLogger = exports.SimpleLogger = void 0;
const AliYun = require("aliyun-sdk");
/**
 * SimpleLogge
 */
class SimpleLogger {
    info(value) { console.log(value); }
    error(value) { console.log(value); }
    debug(value) { console.log(value); }
    fatal(value) { console.log(value); }
    trace(value) { console.log(value); }
    warn(value) { console.log(value); }
}
exports.SimpleLogger = SimpleLogger;
/**
 * Common methods of packaging aliyun SLS log service
 */
class SLSLogger {
    constructor(topic, options) {
        this.topic = topic;
        this.options = options;
        this.logger = new AliYun.SLS(this.options);
    }
    async info(value, source) {
        await this.handle('info', value, source);
    }
    async error(value, source) {
        await this.handle('error', value, source);
    }
    async debug(value, source) {
        await this.handle('debug', value, source);
    }
    async fatal(value, source) {
        await this.handle('fatal', value, source);
    }
    async trace(value, source) {
        await this.handle('trace', value, source);
    }
    async warn(value, source) {
        await this.handle('warn', value, source);
    }
    async handle(level, value, source = 'source') {
        const time = Math.floor(new Date().getTime() / 1000);
        const logGroup = {
            source,
            topic: this.topic,
            logs: [{ time, contents: [{ key: level, value }] }],
        };
        try {
            await new Promise((res, rej) => {
                this.logger.putLogs({
                    logGroup,
                    projectName: this.options.project,
                    logStoreName: this.options.logStore,
                }, (error) => { if (error)
                    rej(error); });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.SLSLogger = SLSLogger;
