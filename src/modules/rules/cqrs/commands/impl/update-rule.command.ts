import { Command } from '@nestjs-architects/typed-cqrs'
import { UpdateRuleDto } from '@root/modules/rules/dto/update-rule.dto'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
export class UpdateRuleCommand extends Command<RuleEntity> {
  constructor(public readonly dto: UpdateRuleDto, public readonly id: number) {
    super()
  }
}
