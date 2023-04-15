import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { UsageEntity } from '../entities/usage.entity'

@CustomRepository(UsageEntity)
export class UsageRepository extends Repository<UsageEntity> {}
