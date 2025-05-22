import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getData() {
    return JSON.stringify({
      code: 200,
      data: {
        name: '测试数据',
      },
    });
  }
}
