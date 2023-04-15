import { GetUserByEmailQuery } from '@modules/users/cqrs/queries/impl/get-user-by-email.query'
import { NotFoundException } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { SendOtpCommand } from '@root/modules/mail/cqrs/commands/impl/send-otp.command'

import { ForgotPasswordCommand } from '../impl/forgot-password.command'

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler implements ICommandHandler<ForgotPasswordCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  async execute(command: ForgotPasswordCommand) {
    const {
      dto: { email },
    } = command
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email))
    if (!user) {
      throw new NotFoundException('error.userNotFound')
    }

    await this.commandBus.execute(
      new SendOtpCommand({
        subject: 'Forgot password',
        to: email,
        text: 'Forgot password',
        html: 'Forgot password',
      }),
    )

    return user
  }
}
