import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class ApplicationDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsOptional()
  @ApiProperty()
  image: string

  @IsString()
  @ApiProperty()
  package: string
}

export class CreateApplicationDto {
  @IsArray()
  @ApiProperty()
  applications: ApplicationDto[]

  @IsString()
  @ApiProperty()
  token: string
}
