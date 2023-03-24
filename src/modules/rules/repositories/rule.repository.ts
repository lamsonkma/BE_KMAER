import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { RuleEntity } from '../entities/rule.entity'

@CustomRepository(RuleEntity)
export class RuleRepository extends Repository<RuleEntity> {}
