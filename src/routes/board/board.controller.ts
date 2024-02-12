import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserInfo } from '../../decorators/user-info.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(
    // readonly: 읽기 전용
    private readonly boardService: BoardService,
  ) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@UserInfo() userInfo, @Body('contents') contents: string) {
    if (!userInfo) throw new UnauthorizedException();

    return this.boardService.create({
      userId: userInfo.id,
      contents,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
  ) {
    return this.boardService.update(userInfo.id, id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(userInfo.id, id);
  }
}
