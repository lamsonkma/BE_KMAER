import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { ApplicationRepository } from '@root/modules/applications/repositories/application.repository'
import { GetDeviceByIdQuery } from '@root/modules/devices/cqrs/queries/impl/get-device-by-id.query'

import { CreateApplicationCommand } from '../impl/create-application.command'

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationCommandHandler implements ICommandHandler<CreateApplicationCommand> {
  constructor(private readonly applicationRepository: ApplicationRepository, private readonly queryBus: QueryBus) {}
  async execute(command: CreateApplicationCommand) {
    const {
      dto: { applications, deviceId },
    } = command

    const device = await this.queryBus.execute(new GetDeviceByIdQuery(deviceId))

    const newApplications = this.applicationRepository.upsert(
      applications.map((application) => ({ ...application, device })),
      ['name'],
    )

    return newApplications
  }
}
