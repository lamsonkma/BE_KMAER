import { LocalAuthGuard } from '@guards/local-auth.guard'
import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('application')
@ApiTags('application')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}
}
