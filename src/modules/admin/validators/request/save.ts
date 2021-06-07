import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { IRequest } from 'modules/database/interfaces/request';

export class SaveValidator implements IRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ required: false, type: 'string', maxLength: 200 })
  public description: string;
}
