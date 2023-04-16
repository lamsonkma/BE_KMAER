import { GetUserByEmailQuery } from '@modules/users/cqrs/queries/impl/get-user-by-email.query'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { SendOtpCommand } from '@root/modules/mail/cqrs/commands/impl/send-otp.command'
import { NewOptCommand } from '@root/modules/users/cqrs/commands/impl/new-opt.command'

import { ForgotPasswordCommand } from '../impl/forgot-password.command'

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler implements ICommandHandler<ForgotPasswordCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  async execute(command: ForgotPasswordCommand) {
    const {
      dto: { email },
    } = command

    const newCode = Math.floor(100000 + Math.random() * 900000)

    const otp = await this.commandBus.execute(
      new NewOptCommand({
        email,
        otp: `${newCode}`,
      }),
    )

    if (!otp) {
      throw new BadRequestException('Can not create otp')
    }

    const result = await this.commandBus.execute(
      new SendOtpCommand({
        subject: 'Forgot password',
        to: email,
        text: 'Forgot password',
        html: `<h1>Forgot password</h1><p>Your otp is: ${newCode}</p>`,
      }),
    )

    return result
  }
}
