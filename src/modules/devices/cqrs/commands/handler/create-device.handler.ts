import { NotFoundException } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'
import { CreateTokenCommand } from '@root/modules/tokens/cqrs/commands/impl/create-token.command'
import { GetUserByIdQuery } from '@root/modules/users/cqrs/queries/impl/get-user-by-id.query'

import { GetDeviceByTokenQuery } from '../../queries/impl/get-device-by-token.query'
import { CreateDeviceCommand } from '../impl/create-device.command'

@CommandHandler(CreateDeviceCommand)
export class CreateDeviceCommandHandler implements ICommandHandler<CreateDeviceCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly deviceRepository: DeviceRepository,
  ) {}
  async execute(command: CreateDeviceCommand) {
    const {
      dto: { name, image, token },
      userId,
    } = command

    const user = await this.queryBus.execute(new GetUserByIdQuery(userId))
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const device = await this.queryBus.execute(new GetDeviceByTokenQuery({ token }))

    if (device) {
      if (device.users.filter((u) => u.id === user.id).length > 0) {
        throw new BadRequestException('You already have this device')
      }
      device.users.push(user)
      return this.deviceRepository.save(device)
    }

    const newDevice = this.deviceRepository.create({
      name,
      image,
      users: [user],
    })

    await this.commandBus.execute(new CreateTokenCommand({ tokenDevice: token, deviceId: newDevice.id }))

    return this.deviceRepository.save(newDevice)
  }
}
