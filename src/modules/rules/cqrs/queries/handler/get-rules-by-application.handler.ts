import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { GetRulesByApplicationQuery } from '../impl/get-rules-by-application.query'

@QueryHandler(GetRulesByApplicationQuery)
export class GetRulesByApplicationQueryHandler implements IQueryHandler<GetRulesByApplicationQuery> {
  constructor(private readonly ruleRepository: RuleRepository) {}
  async execute(query: GetRulesByApplicationQuery) {
    const {
      dto: { packageName, token },
    } = query

    return this.ruleRepository.find({
      relations: ['application'],
      where: {
        application: {
          device: {
            token,
          },
          package: packageName,
        },
      },
    })
  }
}
