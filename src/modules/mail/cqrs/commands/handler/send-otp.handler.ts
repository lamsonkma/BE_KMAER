import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NodeMalerService } from '@root/providers/nodeMailer/nodeMailer.provider'

import { SendOtpCommand } from '../impl/send-otp.command'

@CommandHandler(SendOtpCommand)
export class SendOtpCommandHandler implements ICommandHandler<SendOtpCommand> {
  constructor(private readonly nodeMalerService: NodeMalerService) {}
  async execute(command: SendOtpCommand) {
    const { emaiMailDto } = command
    const result = await this.nodeMalerService.sendEmail(emaiMailDto)
    return result
  }
}
