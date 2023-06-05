import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { UserRepository } from '@root/modules/users/repositories/user.repository'
import { UtilService } from '@root/shared/utils.service'

import { GetUserByIdQuery } from '../../queries/impl/get-user-by-id.query'
import { UpdateProfileUserCommand } from '../impl/update-profile-user.command'

@CommandHandler(UpdateProfileUserCommand)
export class UpdateProfileUserCommandHandler implements ICommandHandler<UpdateProfileUserCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly userRepository: UserRepository) {}
  async execute(command: UpdateProfileUserCommand) {
    const {
      id,
      dto: { name, newPassWord, oldPassWord, image },
    } = command

    const user = await this.queryBus.execute(new GetUserByIdQuery(id))
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (oldPassWord) {
      const isPasswordMatching = await UtilService.validateHash(oldPassWord, user.password)
      if (newPassWord && isPasswordMatching) {
        user.password = UtilService.generateHash(newPassWord)
      } else {
        throw new NotFoundException('Old password is not correct')
      }
    }

    if (name) {
      user.name = name
    }

    if (image) {
      user.image = image
    }

    return this.userRepository.save(user)
  }
}
