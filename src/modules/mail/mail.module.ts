import { Module } from '@nestjs/common/decorators'
import { CqrsModule } from '@nestjs/cqrs'
import { NodeMalerService } from '@root/providers/nodeMailer/nodeMailer.provider'

import { MailController } from './controllers/mail.controller'
import { SendOtpCommandHandler } from './cqrs/commands/handler/send-otp.handler'

const CommandHandlers = [SendOtpCommandHandler]
const QueryHandlers = []

@Module({
  providers: [...QueryHandlers, ...CommandHandlers, NodeMalerService],
  controllers: [MailController],
  imports: [CqrsModule],
})
export class MailModule {}
