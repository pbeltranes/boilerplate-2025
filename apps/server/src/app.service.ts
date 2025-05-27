import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Hello from AppService!');
    return 'Hello World!';
  }
}
