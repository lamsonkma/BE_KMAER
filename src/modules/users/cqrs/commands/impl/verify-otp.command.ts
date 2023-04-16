import { Command } from '@nestjs-architects/typed-cqrs'
import { VerifyOtpDto } from '@root/modules/users/dto/verify-otp.dto'
export class VerifyOtpCommand extends Command<{
  status: boolean
  message: string
}> {
  constructor(public readonly dto: VerifyOtpDto) {
    super()
  }
}
