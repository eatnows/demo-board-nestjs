import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  // 로고 클래스를 선언할 때 이 클래스가 선언된 클래스 안에 클래스의 이름을 명시하게 되면
  // 로깅이 될 때 어느위치에서 로고가 출력됐는지 알 수 있다. (클래스의 이름 출력)
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(this.configService.get<string>('ENVIRONMENT'));
    return this.appService.getHello();
  }

  // router
  // @Get('name/:name')
  // getName(
  //   @Param('name') name: string
  // ): string {
  //   return `${name} hello`;
  // }

  @Get('name')
  getName(
    // query parameter
    @Query('name') name: string,
  ): string {
    return `${name} hello`;
  }
}
