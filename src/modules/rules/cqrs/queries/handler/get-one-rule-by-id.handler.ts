import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { GetOneRuleByIdQuery } from '../impl/get-one-rule-by-id.query'

@QueryHandler(GetOneRuleByIdQuery)
export class GetOneRuleByIdQueryHandler implements IQueryHandler<GetOneRuleByIdQuery> {
  constructor(private readonly ruleRepository: RuleRepository) {}
  async execute(query: GetOneRuleByIdQuery) {
    const { id } = query
    return this.ruleRepository.findOneBy({ id })
  }
}
