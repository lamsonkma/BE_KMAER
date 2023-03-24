import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DeleteRuleByIdCommand } from '../impl/delete-rule-by-id.command'

@CommandHandler(DeleteRuleByIdCommand)
export class DeleteRuleByIdCommandHandler implements ICommandHandler<DeleteRuleByIdCommand> {
  async execute(command: DeleteRuleByIdCommand) {
    return command
  }
}
