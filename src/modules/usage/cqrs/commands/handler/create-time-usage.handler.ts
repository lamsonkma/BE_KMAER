import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { GetApplicatonByTokenAndPackageNameQuery } from '@root/modules/applications/cqrs/queries/impl/get-applicaton-by-token-and-package-name.query'
import { UsageRepository } from '@root/modules/usage/repositories/usage.repository'

import { CreateTimeUsageCommand } from '../impl/create-time-usage.command'

@CommandHandler(CreateTimeUsageCommand)
export class CreateTimeUsageCommandHandler implements ICommandHandler<CreateTimeUsageCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly usageRepository: UsageRepository) {}
  async execute(command: CreateTimeUsageCommand) {
    const {
      dto: { data },
    } = command
    return Promise.all(
      data.map(async (item) => {
        const { applications, dayOfWeek, token } = item
        for (const app of applications) {
          const { packageName, totalTimeInForeground } = app

          const application = await this.queryBus.execute(
            new GetApplicatonByTokenAndPackageNameQuery({ token, packageName }),
          )

          let usage = await this.usageRepository.findOne({
            where: {
              application: {
                id: application.id,
              },
              dayOfWeek,
            },
          })

          if (!usage) {
            usage = this.usageRepository.create({
              dayOfWeek,
              totalTimeInForeground,
              application,
            })
          } else {
            usage.totalTimeInForeground = totalTimeInForeground
          }
          this.usageRepository.save(usage)
        }
      }),
    )
  }
}
