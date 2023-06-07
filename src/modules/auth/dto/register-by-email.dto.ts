import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class RegisterByEmailDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  password: string

  @ApiPropertyOptional()
  @IsOptional()
  image?: string
}
