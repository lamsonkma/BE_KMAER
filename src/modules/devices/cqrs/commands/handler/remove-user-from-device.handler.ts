import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { GetDeviceByIdQuery } from '../../queries/impl/get-device-by-id.query'
import { RemoveUserFromDeviceCommand } from '../impl/remove-user-from-device.command'

@CommandHandler(RemoveUserFromDeviceCommand)
export class RemoveUserFromDeviceCommandHandler implements ICommandHandler<RemoveUserFromDeviceCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly deviceRepository: DeviceRepository) {}
  async execute(command: RemoveUserFromDeviceCommand) {
    const { userId, deviceId } = command
    console.log('hêisidhsid')
    const device = await this.queryBus.execute(new GetDeviceByIdQuery(deviceId))
    if (!device) throw new NotFoundException('Device not found')
    const user = device.users.find((user) => user.id === userId)
    if (!user) throw new NotFoundException('User not found')
    device.users = device.users.filter((user) => user.id !== userId)
    return this.deviceRepository.save(device)
  }
}
