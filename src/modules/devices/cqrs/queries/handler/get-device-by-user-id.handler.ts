import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { GetDeviceByUserIdQuery } from '../impl/get-device-by-user-id.query'

@QueryHandler(GetDeviceByUserIdQuery)
export class GetDeviceByUserIdQueryHandler implements IQueryHandler<GetDeviceByUserIdQuery> {
  constructor(private readonly deviceRepository: DeviceRepository) {}
  async execute(query: GetDeviceByUserIdQuery) {
    const { userId } = query
    //order by application.name
    const devices = this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.users', 'user')
      .leftJoinAndSelect('device.applications', 'applications')
      .where('user.id = :userId', { userId })
      .orderBy('applications.name', 'ASC')
      .getMany()

    return devices
  }
}
