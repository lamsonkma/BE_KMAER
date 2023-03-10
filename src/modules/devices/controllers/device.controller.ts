import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateDeviceCommand } from '../cqrs/commands/impl/create-device.command'
import { GetDeviceByIdQuery } from '../cqrs/queries/impl/get-device-by-id.query'
import { GetDeviceByTokenQuery } from '../cqrs/queries/impl/get-device-by-token.query'
import { CreateDeviceDto } from '../dto/create-device.dto'
import { FindDeviceByTokenDto } from '../dto/find-device-by-token'

@Controller('device')
@ApiTags('device')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DeviceController {
  constructor(private readonly queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.commandBus.execute(new CreateDeviceCommand(createDeviceDto))
  }

  @Get(':id')
  getDevices(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetDeviceByIdQuery(id))
  }

  @Post('token')
  getDeviceByToken(@Body() dto: FindDeviceByTokenDto) {
    return this.queryBus.execute(new GetDeviceByTokenQuery(dto))
  }
}
