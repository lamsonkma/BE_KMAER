import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { DeviceEntity } from '../entities/device.entity'

@CustomRepository(DeviceEntity)
export class DeviceRepository extends Repository<DeviceEntity> {}
