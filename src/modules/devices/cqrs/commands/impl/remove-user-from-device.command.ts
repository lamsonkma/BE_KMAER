import { Command } from '@nestjs-architects/typed-cqrs'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
export class RemoveUserFromDeviceCommand extends Command<DeviceEntity> {
  constructor(public readonly userId: number, public readonly deviceId: number) {
    super()
  }
}
