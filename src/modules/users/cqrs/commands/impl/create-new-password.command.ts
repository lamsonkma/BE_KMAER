import { Command } from '@nestjs-architects/typed-cqrs'
import { NewPasswordDto } from '@root/modules/users/dto/new-password.dto'
import { UserEntity } from '@root/modules/users/entities/user.entity'
export class CreateNewPasswordCommand extends Command<UserEntity> {
  constructor(public readonly userId: number, public readonly dto: NewPasswordDto) {
    super()
  }
}
