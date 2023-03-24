import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { ApplicationEntity } from '../entities/application.entity'

@CustomRepository(ApplicationEntity)
export class ApplicationRepository extends Repository<ApplicationEntity> {}
