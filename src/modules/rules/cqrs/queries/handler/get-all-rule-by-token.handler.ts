import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { GetAllRuleByTokenQuery } from '../impl/get-all-rule-by-token.query'

@QueryHandler(GetAllRuleByTokenQuery)
export class GetAllRuleByTokenQueryHandler implements IQueryHandler<GetAllRuleByTokenQuery> {
  constructor(private readonly ruleRepository: RuleRepository) {}
  async execute(query: GetAllRuleByTokenQuery) {
    const { token } = query
    return this.ruleRepository.find({
      relations: ['application'],
      where: {
        application: {
          device: {
            token,
          },
        },
      },
    })
  }
}
