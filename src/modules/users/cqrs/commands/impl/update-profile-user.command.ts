import { Command } from '@nestjs-architects/typed-cqrs'
import { UpdateUserDto } from '@root/modules/users/dto/user-update.dto'
import { UserEntity } from '@root/modules/users/entities/user.entity'
export class UpdateProfileUserCommand extends Command<UserEntity> {
  constructor(public readonly id: number, public readonly dto: UpdateUserDto) {
    super()
  }
}
