import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateMailDto {
  @ApiProperty()
  @IsEmail()
  to: string

  @ApiProperty()
  @IsString()
  subject: string

  @ApiProperty()
  @IsString()
  text: string

  @ApiProperty()
  @IsOptional()
  html?: string
}

export class SendEmailDto extends PartialType(CreateMailDto) {
  @ApiProperty()
  @IsEmail()
  from: string
}
