import { Query } from '@nestjs-architects/typed-cqrs'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
export class GetAllRuleByTokenQuery extends Query<RuleEntity[]> {
  constructor(public readonly token: string) {
    super()
  }
}
