import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Board } from '../../entity/board.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;
  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('boardService should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  describe('게시글 조회', () => {
    it('2번 게시글의 작성자는 eatnows 다', async () => {
      // getBoardById는 내부적으로 findOneBy를 호출함
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 1,
        uesrId: 2,
        contents: '게시글',
        user: {
          id: 2,
          username: 'eatnows',
          name: 'eatnows',
        },
      } as unknown as Board);

      const board = await boardService.getBoardById(2);

      expect(board.user.name).toBe('eatnows');
    });
  });
});
