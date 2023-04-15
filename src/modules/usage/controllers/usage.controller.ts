import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { DayOfWeek } from '@root/constants/day-of-week.enum'

import { CreateTimeUsageCommand } from '../cqrs/commands/impl/create-time-usage.command'
import { GetUsageByAppIdAndDayOfWweekQuery } from '../cqrs/queries/impl/get-usage-by-app-id-and-day-of-wweek.query'
import { CreateUsageDto } from '../dto/create-usage.dto'
import { GetUsageByAppIdAndTimeDto } from '../dto/get-usage-by-appId-and-time.dto'

@Controller('usage')
@ApiTags('usage')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class UsageController {
  constructor(private readonly queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: CreateUsageDto) {
    return this.commandBus.execute(new CreateTimeUsageCommand(dto))
  }

  @Post('/:appId/:dayOfWeek')
  @ApiQuery({ name: 'dayOfWeek', enum: DayOfWeek })
  async GetUsageApp(@Param('appId', ParseIntPipe) appId: number, @Param('dayOfWeek') dayOfWeek: DayOfWeek) {
    return this.queryBus.execute(new GetUsageByAppIdAndDayOfWweekQuery({ appId, dayOfWeek }))
  }
}
