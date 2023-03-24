import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { RuleController } from './controllers/rule.controller'
import { CreateRuleApplicationCommandHandler } from './cqrs/commands/handler/create-rule-application.handler'
import { UpdateRuleCommandHandler } from './cqrs/commands/handler/update-rule.handler'
import { GetOneRuleByIdQueryHandler } from './cqrs/queries/handler/get-one-rule-by-id.handler'
import { RuleRepository } from './repositories/rule.repository'

const QueryHandlers = [GetOneRuleByIdQueryHandler]
const CommandHandlers = [CreateRuleApplicationCommandHandler, UpdateRuleCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [RuleController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([RuleRepository])],
})
export class RuleModule {}
