import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateApplicationDto } from '@root/modules/applications/dto/create-application.dto'
import { ApplicationEntity } from '@root/modules/applications/entities/application.entity'
export class CreateApplicationCommand extends Command<ApplicationEntity> {
  constructor(public readonly dto: CreateApplicationDto) {
    super()
  }
}
