import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateRuleDto } from '@root/modules/rules/dto/create-rule.dto'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
export class CreateRuleApplicationCommand extends Command<RuleEntity> {
  constructor(public readonly dto: CreateRuleDto) {
    super()
  }
}
