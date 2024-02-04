import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  // PartialType 으로 해당 데이터를 가져올 경우 해당 데코레이터를 제거해줘야한다. 안 그러면 오류 발생
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '작성자 아이디',
    required: true,
    example: '1',
  })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요',
  })
  contents: string;
}
