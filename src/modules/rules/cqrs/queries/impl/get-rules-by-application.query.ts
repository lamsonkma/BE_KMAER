import { Query } from '@nestjs-architects/typed-cqrs'
import { GetRulesByPackageDto } from '@root/modules/rules/dto/get-rules-by-application.dto'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'

export class GetRulesByApplicationQuery extends Query<RuleEntity[]> {
  constructor(public readonly dto: GetRulesByPackageDto) {
    super()
  }
}
