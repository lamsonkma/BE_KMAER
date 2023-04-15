import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RuleRepository } from '@root/modules/rules/repositories/rule.repository'

import { GetAllRulesQuery } from '../impl/get-all-rules.query'

@QueryHandler(GetAllRulesQuery)
export class GetAllRulesQueryHandler implements IQueryHandler<GetAllRulesQuery> {
  constructor(private readonly ruleRepository: RuleRepository) {}
  async execute(query: GetAllRulesQuery) {
    const { deviceId } = query

    return this.ruleRepository.find({
      relations: ['application'],
      where: {
        application: {
          device: {
            id: deviceId,
          },
        },
      },
    })
  }
}
