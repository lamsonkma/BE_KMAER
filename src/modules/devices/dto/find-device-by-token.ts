import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class FindDeviceByTokenDto {
  @IsString()
  @ApiProperty()
  token: string
}
