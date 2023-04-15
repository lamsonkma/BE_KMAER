import { ApiProperty } from '@nestjs/swagger'
import { DayOfWeek } from '@root/constants/day-of-week.enum'
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator'

export class AppUsageDto {
  @ApiProperty()
  @IsNumber()
  totalTimeInForeground: number

  @ApiProperty()
  @IsString()
  packageName: string
}

export class ItemUsageDto {
  @ApiProperty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek

  @ApiProperty({ type: [AppUsageDto] })
  @IsArray()
  applications: AppUsageDto[]

  @ApiProperty()
  @IsString()
  token: string
}

export class CreateUsageDto {
  @ApiProperty({ type: [ItemUsageDto] })
  @IsArray()
  data: ItemUsageDto[] | []
}
