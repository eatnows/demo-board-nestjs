import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryColumn, PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "./user.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'user_id' })
  @Column()
  userId: number;

  @ApiProperty({ description: '내용' })
  @Column()
  contents: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '유저정보' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // 실제 테이블에 user_id 와 같은 이름으로 컬럼이 있기 떄문에
  user: User;
}