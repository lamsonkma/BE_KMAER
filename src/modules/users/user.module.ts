import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserController } from './controllers/user.controller'
import { UserAdminController } from './controllers/user-admin.controller'
import { UpdateProfileUserCommandHandler } from './cqrs/commands/handler/update-profile-user.handler'
import { GetUserByEmailQueryHandler } from './cqrs/queries/handler/get-user-by-email.handler'
import { GetUserByIdQueryHandler } from './cqrs/queries/handler/get-user-by-id.handler'
import { UserRepository } from './repositories/user.repository'

const QueryHandlers = [GetUserByEmailQueryHandler, GetUserByIdQueryHandler]
const CommandHandlers = [UpdateProfileUserCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [UserController, UserAdminController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([UserRepository])],
})
export class UserModule {}
