import { NotFoundException } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { ApplicationRepository } from '@root/modules/applications/repositories/application.repository'
import { CreateDeviceCommand } from '@root/modules/devices/cqrs/commands/impl/create-device.command'
import { GetDeviceByTokenQuery } from '@root/modules/devices/cqrs/queries/impl/get-device-by-token.query'

import { CreateApplicationCommand } from '../impl/create-application.command'

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationCommandHandler implements ICommandHandler<CreateApplicationCommand> {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  async execute(command: CreateApplicationCommand) {
    const {
      dto: { applications, token },
    } = command

    let device = await this.queryBus.execute(new GetDeviceByTokenQuery({ token }))

    if (!device) {
      await this.commandBus.execute(
        new CreateDeviceCommand(
          {
            token,
            image: 'https://cdn-icons-png.flaticon.com/512/49/49672.png',
            name: `TV-${Math.floor(1000 + Math.random() * 9000)}`,
          },
          null,
        ),
      )
      device = await this.queryBus.execute(new GetDeviceByTokenQuery({ token }))
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
