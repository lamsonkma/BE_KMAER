import { ApiProperty } from '@nestjs/swagger'
import { DayOfWeek } from '@root/constants/day-of-week.enum'
import { IsEnum, IsNumber } from 'class-validator'

export class GetUsageByAppIdAndTimeDto {
  @ApiProperty()
  @IsNumber()
  appId: number

  @ApiProperty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek
}
