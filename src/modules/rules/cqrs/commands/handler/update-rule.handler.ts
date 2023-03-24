import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { GetOneAppByIdQuery } from '@root/modules/applications/cqrs/queries/impl/get-one-app-by-id.query'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { GetOneRuleByIdQuery } from '../../queries/impl/get-one-rule-by-id.query'
import { UpdateRuleCommand } from '../impl/update-rule.command'

@CommandHandler(UpdateRuleCommand)
export class UpdateRuleCommandHandler implements ICommandHandler<UpdateRuleCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly ruleRepository: RuleRepository) {}
  async execute(command: UpdateRuleCommand) {
    const {
      dto: { applicationId, enabled, endTime, startTime },
      id,
    } = command

    const application = await this.queryBus.execute(new GetOneAppByIdQuery(applicationId))

    if (!application) {
      throw new NotFoundException('Application not found')
    }

    const rule = await this.queryBus.execute(new GetOneRuleByIdQuery(id))

    if (!rule) {
      throw new NotFoundException('Rule not found')
    }

    const newRule = Object.assign(rule, {
      enabled,
      startTime,
      endTime,
    })

    return this.ruleRepository.save(newRule)
  }
}
