import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { GetDeviceByTokenQuery } from '../impl/get-device-by-token.query'

@QueryHandler(GetDeviceByTokenQuery)
export class GetDeviceByTokenQueryHandler implements IQueryHandler<GetDeviceByTokenQuery> {
  constructor(private readonly deviceRepository: DeviceRepository) {}
  async execute(query: GetDeviceByTokenQuery) {
    const {
      dto: { token },
    } = query
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.users', 'users')
      .leftJoinAndSelect('device.applications', 'applications')
      .where('device.token = :token', { token })
      .getOne()

    return device
  }
}
