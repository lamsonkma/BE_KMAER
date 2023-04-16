import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { UserRepository } from '@root/modules/users/repositories/user.repository'
import { UtilService } from '@root/shared/utils.service'

import { GetUserByIdQuery } from '../../queries/impl/get-user-by-id.query'
import { CreateNewPasswordCommand } from '../impl/create-new-password.command'

@CommandHandler(CreateNewPasswordCommand)
export class CreateNewPasswordCommandHandler implements ICommandHandler<CreateNewPasswordCommand> {
  constructor(private readonly userRepository: UserRepository, private readonly queryBus: QueryBus) {}
  async execute(command: CreateNewPasswordCommand) {
    const {
      dto: { confirmPassword, password },
      userId,
    } = command

    const user = await this.queryBus.execute(new GetUserByIdQuery(userId))
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Password does not match')
    }

    const newPassword = UtilService.generateHash(password)

    return this.userRepository.update(userId, { password: newPassword })
  }
}
