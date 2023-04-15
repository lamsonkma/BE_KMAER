import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { UpdateProfileUserCommand } from '../cqrs/commands/impl/update-profile-user.command'
import { GetUserByIdQuery } from '../cqrs/queries/impl/get-user-by-id.query'
import { UpdateUserDto } from '../dto/user-update.dto'

@Controller('user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get('profile')
  getProfile(@AuthUser() user: JwtClaimsDto) {
    return this.queryBus.execute(new GetUserByIdQuery(user.id))
  }

  @Patch('')
  updateProfile(@AuthUser() user: JwtClaimsDto, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateProfileUserCommand(user.id, dto))
  }
}
