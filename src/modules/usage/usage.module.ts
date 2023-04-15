import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UsageController } from './controllers/usage.controller'
import { CreateTimeUsageCommandHandler } from './cqrs/commands/handler/create-time-usage.handler'
import { GetUsageByAppIdAndDayOfWweekQueryHandler } from './cqrs/queries/handler/get-usage-by-app-id-and-day-of-wweek.handler'
import { UsageRepository } from './repositories/usage.repository'

const QueryHandlers = [GetUsageByAppIdAndDayOfWweekQueryHandler]
const CommandHandlers = [CreateTimeUsageCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [UsageController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([UsageRepository])],
})
export class UsageModule {}
