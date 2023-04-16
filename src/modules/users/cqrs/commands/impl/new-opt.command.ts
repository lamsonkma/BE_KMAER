import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateOptDto } from '@root/modules/users/dto/create-otp.dto'
import { OtpEntity } from '@root/modules/users/entities/otp.entity'
export class NewOptCommand extends Command<OtpEntity> {
  constructor(public readonly dto: CreateOptDto) {
    super()
  }
}
