import { Query } from '@nestjs-architects/typed-cqrs'
import { FindDeviceByTokenDto } from '@root/modules/devices/dto/find-device-by-token'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
export class GetDeviceByTokenQuery extends Query<DeviceEntity> {
  constructor(public readonly dto: FindDeviceByTokenDto) {
    super()
  }
}
