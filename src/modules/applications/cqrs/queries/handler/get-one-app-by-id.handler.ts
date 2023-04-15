import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ApplicationRepository } from '@root/modules/applications/repositories/application.repository'

import { GetOneAppByIdQuery } from '../impl/get-one-app-by-id.query'

@QueryHandler(GetOneAppByIdQuery)
export class GetOneAppByIdQueryHandler implements IQueryHandler<GetOneAppByIdQuery> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}
  async execute(query: GetOneAppByIdQuery) {
    const { id } = query
    return this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.rules', 'rule')
      .leftJoinAndSelect('application.usages', 'usage')
      .where('application.id = :id', { id })
      .getOne()
  }
}
