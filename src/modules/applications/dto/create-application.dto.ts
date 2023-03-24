import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class ApplicationDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  image: string
}

export class CreateApplicationDto {
  @IsArray()
  @ApiProperty()
  applications: ApplicationDto[]

  @IsNumber()
  @ApiProperty()
  deviceId: number

  @IsNumber()
  @ApiProperty()
  timeUsed: number
}
