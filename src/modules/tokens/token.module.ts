import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { TokenController } from './controllers/token.controller'
import { CreateTokenCommandHandler } from './cqrs/commands/handler/create-token.handler'
import { TokenRepository } from './repositories/token.repository'

const QueryHandlers = []
const CommandHandlers = [CreateTokenCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [TokenController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([TokenRepository])],
})
export class TokenModule {}
