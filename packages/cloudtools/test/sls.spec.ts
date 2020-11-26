import { resolve } from 'path';
import { readFileSync } from 'fs';
import { test } from '@jest/globals';

import { SLS } from '../src';

const { sls, errorSls } = JSON.parse(
  readFileSync(resolve(__dirname, '../../../settings/settings.json')).toString(),
);

const simpleLogger = new SLS.SimpleLogger();

const logger = new SLS.SLSLogger('JEST', sls);

/**
 * test sls log
 */

test(
  'simple logger',
  async () => {
    simpleLogger.info('simple logger');
    simpleLogger.error('simple logger');
    simpleLogger.debug('simple logger');
    simpleLogger.fatal('simple logger');
    simpleLogger.trace('simple logger');
    simpleLogger.fatal('simple logger');
    simpleLogger.warn('simple logger');
  },
);

test(
  'sls logger',
  async () => {
    logger.info('simple logger', 'info');
    logger.error('simple logger');
    logger.debug('simple logger');
    logger.fatal('simple logger');
    logger.trace('simple logger');
    logger.fatal('simple logger');
    logger.warn('simple logger');
  },
);

test(
  'sls logger error',
  async () => {
    const logger = new SLS.SLSLogger('JEST', errorSls);
    await logger.info('simple logger', 'info');
  },
);
