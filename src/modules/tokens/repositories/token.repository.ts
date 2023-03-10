import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { TokenEntity } from '../entities/token.entity'

@CustomRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {}
