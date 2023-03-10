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
    const device = this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.tokens', 'token')
      .where('token.token_device = :token', { token })
      .getOne()

    return device
  }
}
