import { LocalAuthGuard } from '@guards/local-auth.guard'
import { Body, Controller, HttpCode, NotFoundException, Post, Request, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { VerifyOtpCommand } from '@root/modules/users/cqrs/commands/impl/verify-otp.command'
import { GetUserByEmailQuery } from '@root/modules/users/cqrs/queries/impl/get-user-by-email.query'
import { VerifyOtpDto } from '@root/modules/users/dto/verify-otp.dto'

import { CreateTokenCommand } from '../cqrs/commands/impl/create-token.command'
import { ForgotPasswordCommand } from '../cqrs/commands/impl/forgot-password.command'
import { RegisterByEmailCommand } from '../cqrs/commands/impl/register-by-email.command'
import { ForgotPasswordDto } from '../dto/forgot-password.dto'
import { LoginByEmailDto } from '../dto/login-by-email.dto'
import { LoginResponseDto } from '../dto/login-response.dto'
import { RegisterByEmailDto } from '../dto/register-by-email.dto'

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginByEmailDto })
  @ApiResponse({
    type: LoginResponseDto,
    status: 200,
  })
  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    const user = req.user
    const token = await this.commandBus.execute(new CreateTokenCommand(user))

    return { user, token }
  }

  @Post('register')
  @ApiResponse({
    type: LoginResponseDto,
    status: 201,
  })
  @HttpCode(201)
  async register(@Body() dto: RegisterByEmailDto) {
    const user = await this.commandBus.execute(new RegisterByEmailCommand(dto))
    const token = await this.commandBus.execute(new CreateTokenCommand(user))

    return { user, token }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.commandBus.execute(new ForgotPasswordCommand(dto))
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const user = await this.queryBus.execute(new GetUserByEmailQuery(dto.email))

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const token = await this.commandBus.execute(new CreateTokenCommand(user))

    const result = await this.commandBus.execute(new VerifyOtpCommand(dto))

    if (result.status) {
      return { user, token }
    }

    return result
  }
}
