import { Command } from '@nestjs-architects/typed-cqrs'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
export class DeleteRuleByIdCommand extends Command<RuleEntity> {
  constructor(public readonly id: number) {
    super()
  }
}
