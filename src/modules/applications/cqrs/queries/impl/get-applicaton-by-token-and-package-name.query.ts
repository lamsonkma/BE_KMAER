import { Query } from '@nestjs-architects/typed-cqrs'
import { GetApplicationByTokenAndPackageNameDto } from '@root/modules/applications/dto/get-application-by-token-and-package-name.dto'
import { ApplicationEntity } from '@root/modules/applications/entities/application.entity'
export class GetApplicatonByTokenAndPackageNameQuery extends Query<ApplicationEntity> {
  constructor(public readonly dto: GetApplicationByTokenAndPackageNameDto) {
    super()
  }
}
