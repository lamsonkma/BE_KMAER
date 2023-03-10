import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { DeviceRepository } from '@root/modules/devices/repositories/device.repository'

import { GetDeviceByIdQuery } from '../impl/get-device-by-id.query'

@QueryHandler(GetDeviceByIdQuery)
export class GetDeviceByIdQueryHandler implements IQueryHandler<GetDeviceByIdQuery> {
  constructor(private readonly deviceRepository: DeviceRepository) {}
  async execute(query: GetDeviceByIdQuery) {
    const { id } = query
    return this.deviceRepository.findOne({ where: { id }, relations: ['tokens'] })
  }
}
