import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '235899', // 你的数据库密码
      database: 'zhihu', // 你的数据库
      synchronize: true, // 自动同步实体到数据库（生产环境关闭！）
      entities: ['dist/**/*.entity{.ts,.js}'], // 修正实体路径模式
      logging: true, // 开启SQL日志
      extra: {
        ssl: false, // 需要SSL时配置
        connectionLimit: 5, // 连接池数量
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
