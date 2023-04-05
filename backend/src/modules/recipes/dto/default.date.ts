import { IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultDate {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ type: Date, description: '레시피 생성일' })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ type: Date, description: '레시피 최근수정일' })
  updatedAt: Date;
}
