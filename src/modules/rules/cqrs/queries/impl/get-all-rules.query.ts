import { Query } from '@nestjs-architects/typed-cqrs'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
export class GetAllRulesQuery extends Query<RuleEntity[]> {
  constructor(public readonly deviceId: number) {
    super()
  }
}
