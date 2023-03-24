import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { GetDeviceByUserIdQuery } from '../impl/get-device-by-user-id.query'

@QueryHandler(GetDeviceByUserIdQuery)
export class GetDeviceByUserIdQueryHandler implements IQueryHandler<GetDeviceByUserIdQuery> {
  constructor(private readonly deviceRepository: DeviceRepository) {}
  async execute(query: GetDeviceByUserIdQuery) {
    const { userId } = query
    const devices = this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany()

    return devices
  }
}
