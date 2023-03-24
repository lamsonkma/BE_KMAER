import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateDeviceDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  image: string

  @IsString()
  @ApiProperty()
  token: string
}
