import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Board } from './board.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // 컬럼안에 속성들을 명시해줄 수 있음.
  @ApiProperty({ description: '유저아이디', example: 'admin' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '비밀번호' })
  @Column()
  // @Exclude()
  password: string;

  @ApiProperty({ description: '이름' })
  @Column()
  name: string;

  // typeORM에서 엔티티들을 순차적으로 불러올 때 circular dependency를 방지하기 위해서
  // arrow function으로 일단은 가져와서 정리를 한 다음에 호출하기 위하여 애로우로 되어있음.
  // 두번째는 불러온 Board 엔티티 안에서 어떤 것인지를 확인하는 과정.
  @ApiProperty({ description: '작성한 게시글' })
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @Column({ select: false, nullable: true, insert: false, update: false })
  boardCount?: number;
}
