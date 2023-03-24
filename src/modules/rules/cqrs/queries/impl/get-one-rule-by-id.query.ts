import { Query } from '@nestjs-architects/typed-cqrs'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
export class GetOneRuleByIdQuery extends Query<RuleEntity> {
  constructor(public readonly id: number) {
    super()
  }
}
