import { Query } from '@nestjs-architects/typed-cqrs'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
export class GetDeviceByIdQuery extends Query<DeviceEntity> {
  constructor(public readonly id: number) {
    super()
  }
}
