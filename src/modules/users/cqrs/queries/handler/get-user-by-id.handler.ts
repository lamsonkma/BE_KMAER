import { UserRepository } from '@modules/users/repositories/user.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserEntity } from '@root/modules/users/entities/user.entity'

import { GetUserByIdQuery } from '../impl/get-user-by-id.query'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: GetUserByIdQuery): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: query.id } })
  }
}
