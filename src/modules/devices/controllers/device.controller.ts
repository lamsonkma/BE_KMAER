import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateDeviceCommand } from '../cqrs/commands/impl/create-device.command'
import { RemoveUserFromDeviceCommand } from '../cqrs/commands/impl/remove-user-from-device.command'
import { UpdateDeviceCommand } from '../cqrs/commands/impl/update-device.command'
import { GetDeviceByIdQuery } from '../cqrs/queries/impl/get-device-by-id.query'
import { GetDeviceByTokenQuery } from '../cqrs/queries/impl/get-device-by-token.query'
import { GetDeviceByUserIdQuery } from '../cqrs/queries/impl/get-device-by-user-id.query'
import { CreateDeviceDto } from '../dto/create-device.dto'
import { FindDeviceByTokenDto } from '../dto/find-device-by-token'
import { UpdateDeviceDto } from '../dto/update-device.dto'

@Controller('device')
@ApiTags('device')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DeviceController {
  constructor(private readonly queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto, @AuthUser() user: JwtClaimsDto) {
    return this.commandBus.execute(new CreateDeviceCommand(createDeviceDto, user.id))
  }
  @Get('me')
  getDeviceByUser(@AuthUser() user: JwtClaimsDto) {
    return this.queryBus.execute(new GetDeviceByUserIdQuery(user.id))
  }

  @Get(':id')
  getDevices(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetDeviceByIdQuery(id))
  }

  @Delete(':id')
  removeUserFromDevice(@AuthUser() user: JwtClaimsDto, @Param('id', ParseIntPipe) id: number) {
    console.log('hello')
    return this.commandBus.execute(new RemoveUserFromDeviceCommand(user.id, id))
  }

  @Post('token')
  getDeviceByToken(@Body() dto: FindDeviceByTokenDto) {
    return this.queryBus.execute(new GetDeviceByTokenQuery(dto))
  }

  @Patch(':id')
  updateDevice(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDeviceDto) {
    return this.commandBus.execute(new UpdateDeviceCommand(id, dto))
  }
}
