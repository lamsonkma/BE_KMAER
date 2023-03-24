import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@root/guards/jwt-auth.guard'

import { CreateApplicationCommand } from '../cqrs/commands/impl/create-application.command'
import { GetOneAppByIdQuery } from '../cqrs/queries/impl/get-one-app-by-id.query'
import { CreateApplicationDto } from '../dto/create-application.dto'

@Controller('application')
@ApiTags('application')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post()
  @HttpCode(200)
  createAndUpdateApplication(@Body() dto: CreateApplicationDto) {
    return this.commandBus.execute(new CreateApplicationCommand(dto))
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetOneAppByIdQuery(id))
  }
}
