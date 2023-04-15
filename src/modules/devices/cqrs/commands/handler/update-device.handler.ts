import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { GetDeviceByIdQuery } from '../../queries/impl/get-device-by-id.query'
import { UpdateDeviceCommand } from '../impl/update-device.command'

@CommandHandler(UpdateDeviceCommand)
export class UpdateDeviceCommandHandler implements ICommandHandler<UpdateDeviceCommand> {
  constructor(private readonly deviceRepository: DeviceRepository, private readonly queryBus: QueryBus) {}
  async execute(command: UpdateDeviceCommand) {
    const { dto, id } = command
    const device = await this.queryBus.execute(new GetDeviceByIdQuery(id))
    if (!device) {
      throw new NotFoundException('Device not found')
    }

    const newDevice = Object.assign(device, dto)

    return this.deviceRepository.save(newDevice)
  }
}
