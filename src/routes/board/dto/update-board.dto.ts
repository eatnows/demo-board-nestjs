import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBoardDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요.',
  })
  contents?: string;
}

// createBoardDto 타입을 그대로 갖고 와서 확장하여 사용하겠다.
// PartialType 이라는 것은 그것을 모두 다 옵셔널한 값으로 갖고 오겠다.
// CreateBoardDto 에 속성들은 그대로 가져오지만 모두 옵셔널한 값으로 가져옴
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}

// 몇개 골라서
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {}
// 전체 필드에서 몇 개만 삭제
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['name']) {}
