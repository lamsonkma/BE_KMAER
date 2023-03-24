import { Query } from '@nestjs-architects/typed-cqrs'
import { ApplicationEntity } from '@root/modules/applications/entities/application.entity'
export class GetOneAppByIdQuery extends Query<ApplicationEntity> {
  constructor(public readonly id: number) {
    super()
  }
}
