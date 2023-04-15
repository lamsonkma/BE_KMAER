import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { ApplicationRepository } from '@root/modules/applications/repositories/application.repository'
import { GetDeviceByTokenQuery } from '@root/modules/devices/cqrs/queries/impl/get-device-by-token.query'

import { CreateApplicationCommand } from '../impl/create-application.command'

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationCommandHandler implements ICommandHandler<CreateApplicationCommand> {
  constructor(private readonly applicationRepository: ApplicationRepository, private readonly queryBus: QueryBus) {}
  async execute(command: CreateApplicationCommand) {
    const {
      dto: { applications, token },
    } = command

    const device = await this.queryBus.execute(new GetDeviceByTokenQuery({ token }))

    if (!device) {
      throw new NotFoundException('Device not found')
    }

    const applicationsToCreate = applications.filter(
      (application) =>
        !device.applications.find((app) => app.package === application.package && app.name === application.name),
    )

    const newApplications = await Promise.all(
      applicationsToCreate.map((application) => this.applicationRepository.create({ ...application, device })),
    )

    return this.applicationRepository.save(newApplications)
  }
}
