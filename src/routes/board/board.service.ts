import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from "./dto/update-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entity/user.entity";
import { Board } from "../../entity/board.entity";

@Injectable()
export class BoardService {
  constructor(
    // repository를 di 할때는 데코레이터가 필요하다
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);

    return board;
  }

  create(data: CreateBoardDto) {
    // create 함수는 DB에 생성하기 위한 인스턴스를 생성한다.
    // const board = this.boardRepository.create(data);
    // 실제 디비에 저장하는 메소드 save
    return this.boardRepository.save(data);
  }

  async update(userId: number, id: number, data: UpdateBoardDto) {
    const board = await this.getBoardById(id);

    if (!board) throw new HttpException('Not_Found', HttpStatus.NOT_FOUND);

    if (board.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.boardRepository.update(id, {
      ...data,
    });
  }

  async delete(userId: number, id: number) {
    const board = await this.getBoardById(id);

    if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    if (board.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.boardRepository.remove(board);
  }

  async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({
      id,
    });
  }
}
