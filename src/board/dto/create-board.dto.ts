import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  // PartialType 으로 해당 데이터를 가져올 경우 해당 데코레이터를 제거해줘야한다. 안 그러면 오류 발생
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요',
  })
  contents: string;
}
