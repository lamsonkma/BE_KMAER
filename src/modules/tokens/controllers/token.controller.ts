import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateTokenCommand } from '../cqrs/commands/impl/create-token.command'
import { CreateTokenDto } from '../dto/create-token.dto'

@Controller('token')
@ApiTags('token')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TokenController {
  constructor(private readonly queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  createToken(@Body() createTokenDto: CreateTokenDto) {
    return this.commandBus.execute(new CreateTokenCommand(createTokenDto))
  }
}
