import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { RuleController } from './controllers/rule.controller'
import { CreateRuleApplicationCommandHandler } from './cqrs/commands/handler/create-rule-application.handler'
import { DeleteRuleByIdCommandHandler } from './cqrs/commands/handler/delete-rule-by-id.handler'
import { UpdateRuleCommandHandler } from './cqrs/commands/handler/update-rule.handler'
import { GetAllRuleByTokenQueryHandler } from './cqrs/queries/handler/get-all-rule-by-token.handler'
import { GetAllRulesQueryHandler } from './cqrs/queries/handler/get-all-rules.handler'
import { GetOneRuleByIdQueryHandler } from './cqrs/queries/handler/get-one-rule-by-id.handler'
import { GetRulesByApplicationQueryHandler } from './cqrs/queries/handler/get-rules-by-application.handler'
import { RuleRepository } from './repositories/rule.repository'

const QueryHandlers = [
  GetOneRuleByIdQueryHandler,
  GetAllRulesQueryHandler,
  GetAllRuleByTokenQueryHandler,
  GetRulesByApplicationQueryHandler,
]
const CommandHandlers = [CreateRuleApplicationCommandHandler, UpdateRuleCommandHandler, DeleteRuleByIdCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [RuleController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([RuleRepository])],
})
export class RuleModule {}
