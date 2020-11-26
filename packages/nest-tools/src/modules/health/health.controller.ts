import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async index(): Promise<string> { return 'I`M Health' }

  @Get('favicon.ico')
  @HttpCode(HttpStatus.NOT_FOUND)
  async favicon(): Promise<string> { return 'I`M favicon.ico' }
}
