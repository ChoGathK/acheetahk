import * as AliYun from 'aliyun-sdk';

import { Level, SLSOptions } from './types';

/**
 * SimpleLogge
 */

export class SimpleLogger {
  public info(value: string) { console.log(value) }
  public error(value: string) { console.log(value) }
  public debug(value: string) { console.log(value) }
  public fatal(value: string) { console.log(value) }
  public trace(value: string) { console.log(value) }
  public warn(value: string) { console.log(value) }
}

/**
 * Common methods of packaging aliyun SLS log service
 */

export class SLSLogger {

  private logger: AliYun.SLS = new AliYun.SLS(this.options);

  constructor(
    private readonly topic: string,
    private readonly options: SLSOptions,
  ) {}

  public async info(value: string, source?: string) {
    await this.handle('info', value, source);
  }

  public async error(value: string, source?: string) {
    await this.handle('error', value, source);
  }

  public async debug(value: string, source?: string) {
    await this.handle('debug', value, source);
  }

  public async fatal(value: string, source?: string) {
    await this.handle('fatal', value, source);
  }

  public async trace(value: string, source?: string) {
    await this.handle('trace', value, source);
  }

  public async warn(value: string, source?: string) {
    await this.handle('warn', value, source);
  }

  private async handle(level: Level, value: string, source = 'source') {
    const time = Math.floor(new Date().getTime() / 1000);

    const logGroup = {
      source,
      topic: this.topic,
      logs: [{ time, contents: [{ key: level, value }] }],
    };

    try {
      await new Promise((res, rej) => {
        this.logger.putLogs(
          {
            logGroup,
            projectName: this.options.project,
            logStoreName: this.options.logStore,
          },
          (error) => { if (error) rej(error); },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
