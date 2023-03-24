import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
export class CreateRuleDto {
  @IsNumber()
  @ApiProperty()
  applicationId: number

  @IsString()
  @ApiProperty()
  startTime: string

  @IsString()
  @ApiProperty()
  endTime: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  enabled: boolean
}
