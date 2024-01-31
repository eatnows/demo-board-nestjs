import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import ConfigModule from './config';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestjs',
      password: 'password',
      database: 'postgres',
      // 현재 디렉토리 하위에 entity가 포함된 모든 ts, js 파일 (ts가 js로 변환되기 떄문에 js까지 넣어줌)
      entities: [__dirname + '/**/*.entity.{.ts,.js}'],
      // synchronize: true 엔티티가 테이블에 대한 정의를 갖고있어서 엔티티가 변하면 실제 디비에 반영이 됨.
      synchronize: false,
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// 미들웨어를 사용하려면 앱 모듈에 등록을 해야함.
// 앱 모듈에 등록을 하기 위해서는 nestModule을 구현해줘야 한다.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 특정 컨트롤러에만 적용하고 싶으면 컨트롤러를 넣으면 됨.
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
