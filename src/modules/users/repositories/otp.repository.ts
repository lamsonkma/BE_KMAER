import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { OtpEntity } from '../entities/otp.entity'

@CustomRepository(OtpEntity)
export class OtpRepository extends Repository<OtpEntity> {}
