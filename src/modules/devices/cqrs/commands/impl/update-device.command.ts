import { Command } from '@nestjs-architects/typed-cqrs'
import { UpdateDeviceDto } from '@root/modules/devices/dto/update-device.dto'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
export class UpdateDeviceCommand extends Command<DeviceEntity> {
  constructor(public readonly id: number, public readonly dto: UpdateDeviceDto) {
    super()
  }
}
