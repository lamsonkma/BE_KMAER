import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string

  @ApiPropertyOptional()
  @IsOptional()
  newPassWord?: string

  @ApiPropertyOptional()
  @IsOptional()
  oldPassWord?: string

  @ApiPropertyOptional()
  @IsOptional()
  image?: string
}
