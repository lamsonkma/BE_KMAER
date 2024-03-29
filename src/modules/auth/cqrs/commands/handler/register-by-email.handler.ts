import { GetUserByEmailQuery } from '@modules/users/cqrs/queries/impl/get-user-by-email.query'
import { UserRepository } from '@modules/users/repositories/user.repository'
import { BadRequestException } from '@nestjs/common'
import { CommandHandler, QueryBus } from '@nestjs/cqrs'
import { UtilService } from '@shared/utils.service'

import { RegisterByEmailCommand } from '../impl/register-by-email.command'

@CommandHandler(RegisterByEmailCommand)
export class RegisterByEmailCommandHandler {
  constructor(private readonly queryBus: QueryBus, private readonly userRepository: UserRepository) {}
  async execute(command: RegisterByEmailCommand) {
    const {
      dto: { email, password, name, image },
    } = command
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email))
    if (user) {
      throw new BadRequestException('Email already exists')
    }

    const newUser = this.userRepository.create({
      email,
      password: UtilService.generateHash(password),
      name,
      image,
    })

    return await this.userRepository.save(newUser)
  }
}
