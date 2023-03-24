import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { GetOneAppByIdQuery } from '@root/modules/applications/cqrs/queries/impl/get-one-app-by-id.query'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { CreateRuleApplicationCommand } from '../impl/create-rule-application.command'

@CommandHandler(CreateRuleApplicationCommand)
export class CreateRuleApplicationCommandHandler implements ICommandHandler<CreateRuleApplicationCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly ruleRepository: RuleRepository) {}
  async execute(command: CreateRuleApplicationCommand) {
    const {
      dto: { applicationId, endTime, startTime, enabled },
    } = command

    const application = await this.queryBus.execute(new GetOneAppByIdQuery(applicationId))
    if (!application) {
      throw new NotFoundException('Application not found')
    }

    const rule = this.ruleRepository.create({
      application,
      endTime,
      startTime,
      enabled,
    })

    return this.ruleRepository.save(rule)
  }
}
