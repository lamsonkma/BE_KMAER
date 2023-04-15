import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UsageRepository } from '@root/modules/usage/repositories/usage.repository'

import { GetUsageByAppIdAndDayOfWweekQuery } from '../impl/get-usage-by-app-id-and-day-of-wweek.query'

@QueryHandler(GetUsageByAppIdAndDayOfWweekQuery)
export class GetUsageByAppIdAndDayOfWweekQueryHandler implements IQueryHandler<GetUsageByAppIdAndDayOfWweekQuery> {
  constructor(private readonly usageRepository: UsageRepository) {}
  async execute(query: GetUsageByAppIdAndDayOfWweekQuery) {
    const {
      dto: { appId, dayOfWeek },
    } = query

    const usage = this.usageRepository.find({
      where: {
        application: {
          id: appId,
        },
        dayOfWeek: dayOfWeek,
      },
    })

    return usage
  }
}
