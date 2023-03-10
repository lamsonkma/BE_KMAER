import { GetUserByEmailQuery } from '@modules/users/cqrs/queries/impl/get-user-by-email.query'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { UtilService } from '@shared/utils.service'

import { ForgotPasswordCommand } from '../impl/forgot-password.command'

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler implements ICommandHandler<ForgotPasswordCommand> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(_command: ForgotPasswordCommand) {
    const { email } = _command
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email))
    if (!user) {
      throw new NotFoundException('error.userNotFound')
    }
    return user
  }
}
