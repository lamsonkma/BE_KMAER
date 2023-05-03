import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { DeleteRuleByIdCommand } from '../impl/delete-rule-by-id.command'

@CommandHandler(DeleteRuleByIdCommand)
export class DeleteRuleByIdCommandHandler implements ICommandHandler<DeleteRuleByIdCommand> {
  constructor(private readonly ruleRepository: RuleRepository) {}
  async execute(command: DeleteRuleByIdCommand) {
    const { id } = command
    return this.ruleRepository.delete(id)
  }
}
