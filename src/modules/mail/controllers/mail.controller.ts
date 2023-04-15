import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { NodeMalerService } from '@root/providers/nodeMailer/nodeMailer.provider'

import { CreateMailDto } from '../dto/create-email.dto'

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus,
    private readonly nodeMailerService: NodeMalerService,
  ) {}

  @Post()
  sendMail(@Body() createMailDto: CreateMailDto) {
    return this.nodeMailerService.sendEmail(createMailDto)
  }
}
