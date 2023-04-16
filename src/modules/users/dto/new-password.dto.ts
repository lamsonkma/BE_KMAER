import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class NewPasswordDto {
  @IsString()
  @ApiProperty()
  password: string

  @IsString()
  @ApiProperty()
  confirmPassword: string
}
