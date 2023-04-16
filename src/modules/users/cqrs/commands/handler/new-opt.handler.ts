import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { OtpRepository } from '@root/modules/users/repositories/otp.repository'

import { GetUserByEmailQuery } from '../../queries/impl/get-user-by-email.query'
import { NewOptCommand } from '../impl/new-opt.command'

@CommandHandler(NewOptCommand)
export class NewOptCommandHandler implements ICommandHandler<NewOptCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly otpRepository: OtpRepository) {}
  async execute(command: NewOptCommand) {
    const {
      dto: { email, otp },
    } = command

    const user = await this.queryBus.execute(new GetUserByEmailQuery(email))
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const result = this.otpRepository.create({
      user,
      code: otp,
    })

    return this.otpRepository.save(result)
  }
}
