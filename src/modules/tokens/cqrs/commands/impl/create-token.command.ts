import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateTokenDto } from '@root/modules/tokens/dto/create-token.dto'
import { TokenEntity } from '@root/modules/tokens/entities/token.entity'
export class CreateTokenCommand extends Command<TokenEntity> {
  constructor(public readonly dto: CreateTokenDto) {
    super()
  }
}
