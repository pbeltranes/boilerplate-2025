import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api')
  getHello(@Res() res: Response) {
    res.json({ message: this.appService.getHello() });
  }
}
