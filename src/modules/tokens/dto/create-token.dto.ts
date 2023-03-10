import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateTokenDto {
  @IsString()
  @ApiProperty()
  tokenDevice: string

  @IsNumber()
  @ApiProperty()
  deviceId: number
}
