import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateMailDto } from '@root/modules/mail/dto/create-email.dto'

export class SendOtpCommand extends Command<{ status: boolean }> {
  constructor(public readonly emaiMailDto: CreateMailDto) {
    super()
  }
}
