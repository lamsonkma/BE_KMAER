import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { GetDeviceByIdQuery } from '@root/modules/devices/cqrs/queries/impl/get-device-by-id.query'
import { TokenRepository } from '@root/modules/tokens/repositories/token.repository'

import { CreateTokenCommand } from '../impl/create-token.command'

@CommandHandler(CreateTokenCommand)
export class CreateTokenCommandHandler implements ICommandHandler<CreateTokenCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly tokenRepository: TokenRepository) {}
  async execute(command: CreateTokenCommand) {
    const {
      dto: { deviceId, tokenDevice },
    } = command

    const device = await this.queryBus.execute(new GetDeviceByIdQuery(deviceId))
    if (!device) {
      throw new NotFoundException('Device not found')
    }

    const tokenEntity = this.tokenRepository.create({
      device,
      tokenDevice,
    })

    return this.tokenRepository.save(tokenEntity)
  }
}
