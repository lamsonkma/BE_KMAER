import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs'
import { ApplicationRepository } from '@root/modules/applications/repositories/application.repository'

import { GetApplicatonByTokenAndPackageNameQuery } from '../impl/get-applicaton-by-token-and-package-name.query'

@QueryHandler(GetApplicatonByTokenAndPackageNameQuery)
export class GetApplicatonByTokenAndPackageNameQueryHandler
  implements IQueryHandler<GetApplicatonByTokenAndPackageNameQuery>
{
  constructor(private readonly queryBus: QueryBus, private readonly applicationRepository: ApplicationRepository) {}
  async execute(query: GetApplicatonByTokenAndPackageNameQuery) {
    const {
      dto: { token, packageName },
    } = query

    const application = this.applicationRepository.findOne({
      where: {
        device: {
          token,
        },
        package: packageName,
      },
    })

    return application
  }
}
