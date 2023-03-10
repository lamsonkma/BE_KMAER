import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { CreateDeviceCommand } from '../impl/create-device.command'

@CommandHandler(CreateDeviceCommand)
export class CreateDeviceCommandHandler implements ICommandHandler<CreateDeviceCommand> {
  constructor(private readonly deviceRepository: DeviceRepository) {}
  async execute(command: CreateDeviceCommand) {
    const {
      dto: { name, image },
    } = command

    const newDevice = this.deviceRepository.create({
      name,
      image,
    })

    return this.deviceRepository.save(newDevice)
  }
}
