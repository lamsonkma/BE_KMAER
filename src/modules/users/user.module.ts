import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserController } from './controllers/user.controller'
import { UserAdminController } from './controllers/user-admin.controller'
import { CreateNewPasswordCommandHandler } from './cqrs/commands/handler/create-new-password.handler'
import { NewOptCommandHandler } from './cqrs/commands/handler/new-opt.handler'
// import { NewOptCommandHandler } from './cqrs/commands/handler/new-opt.handler'
import { UpdateProfileUserCommandHandler } from './cqrs/commands/handler/update-profile-user.handler'
import { VerifyOtpCommandHandler } from './cqrs/commands/handler/verify-otp.handler'
import { GetUserByEmailQueryHandler } from './cqrs/queries/handler/get-user-by-email.handler'
import { GetUserByIdQueryHandler } from './cqrs/queries/handler/get-user-by-id.handler'
import { OtpRepository } from './repositories/otp.repository'
import { UserRepository } from './repositories/user.repository'

const QueryHandlers = [GetUserByEmailQueryHandler, GetUserByIdQueryHandler]
const CommandHandlers = [
  UpdateProfileUserCommandHandler,
  NewOptCommandHandler,
  VerifyOtpCommandHandler,
  CreateNewPasswordCommandHandler,
]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [UserController, UserAdminController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([UserRepository, OtpRepository])],
})
export class UserModule {}
