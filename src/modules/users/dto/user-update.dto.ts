import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  name?: string

  @ApiProperty()
  @IsOptional()
  newPassWord?: string

  @ApiProperty()
  @IsOptional()
  oldPassWord?: string
}
