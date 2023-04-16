import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { OtpRepository } from '@root/modules/users/repositories/otp.repository'

import { VerifyOtpCommand } from '../impl/verify-otp.command'

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpCommandHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}
  async execute(command: VerifyOtpCommand) {
    const {
      dto: { email, otp },
    } = command

    const result = await this.otpRepository.findOne({
      where: {
        code: otp,
        user: {
          email,
        },
      },
    })

    if (!result) {
      return {
        message: 'OTP not correct',
        status: false,
      }
    }

    if (result.createdAt.getTime() + 1000 * 60 * 5 < Date.now()) {
      return {
        message: 'OTP expired',
        status: false,
      }
    }

    await this.otpRepository.delete(result.id)

    return {
      message: 'OTP verified',
      status: true,
    }
  }
}
