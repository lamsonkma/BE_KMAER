import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateRuleApplicationCommand } from '../cqrs/commands/impl/create-rule-application.command'
import { DeleteRuleByIdCommand } from '../cqrs/commands/impl/delete-rule-by-id.command'
import { UpdateRuleCommand } from '../cqrs/commands/impl/update-rule.command'
import { CreateRuleDto } from '../dto/create-rule.dto'
import { UpdateRuleDto } from '../dto/update-rule.dto'

@Controller('rule')
@ApiTags('rule')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RuleController {
  constructor(private readonly queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  createRule(@Body() createRuleDto: CreateRuleDto) {
    return this.commandBus.execute(new CreateRuleApplicationCommand(createRuleDto))
  }

  @Patch(':id')
  updateRule(@Param('id', ParseIntPipe) id: number, @Body() updateRuleDto: UpdateRuleDto) {
    return this.commandBus.execute(new UpdateRuleCommand(updateRuleDto, id))
  }

  @Delete()
  deleteRule(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteRuleByIdCommand(id))
  }
}
