import { Query } from '@nestjs-architects/typed-cqrs'
import { ForgotPasswordDto } from '@root/modules/auth/dto/forgot-password.dto'

export class ForgotPasswordCommand extends Query<{ status: boolean }> {
  constructor(public readonly dto: ForgotPasswordDto) {
    super()
  }
}
