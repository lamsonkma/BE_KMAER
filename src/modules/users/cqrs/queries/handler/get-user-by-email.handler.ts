import { UserRepository } from '@modules/users/repositories/user.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserEntity } from '@root/modules/users/entities/user.entity'

import { GetUserByEmailQuery } from '../impl/get-user-by-email.query'

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  execute(_query: GetUserByEmailQuery): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email: _query.email }, select: ['devices'] })
  }
}
