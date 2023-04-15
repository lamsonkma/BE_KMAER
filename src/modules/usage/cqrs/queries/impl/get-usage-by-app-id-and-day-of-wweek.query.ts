import { Query } from '@nestjs-architects/typed-cqrs'
import { GetUsageByAppIdAndTimeDto } from '@root/modules/usage/dto/get-usage-by-appId-and-time.dto'
import { UsageEntity } from '@root/modules/usage/entities/usage.entity'
export class GetUsageByAppIdAndDayOfWweekQuery extends Query<UsageEntity> {
  constructor(public readonly dto: GetUsageByAppIdAndTimeDto) {
    super()
  }
}
