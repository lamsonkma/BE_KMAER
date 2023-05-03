import { AuthUser } from '@decorators/auth-user.decorator'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateRuleApplicationCommand } from '../cqrs/commands/impl/create-rule-application.command'
import { DeleteRuleByIdCommand } from '../cqrs/commands/impl/delete-rule-by-id.command'
import { UpdateRuleCommand } from '../cqrs/commands/impl/update-rule.command'
import { GetAllRuleByTokenQuery } from '../cqrs/queries/impl/get-all-rule-by-token.query'
import { GetAllRulesQuery } from '../cqrs/queries/impl/get-all-rules.query'
import { GetRulesByApplicationQuery } from '../cqrs/queries/impl/get-rules-by-application.query'
import { CreateRuleDto } from '../dto/create-rule.dto'
import { GetRulesByPackageDto } from '../dto/get-rules-by-application.dto'
import { UpdateRuleDto } from '../dto/update-rule.dto'

@Controller('rule')
@ApiTags('rule')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class RuleController {
  constructor(private readonly queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get(':id')
  getRules(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetAllRulesQuery(id))
  }

  @Get('token/:token')
  getRulesByToken(@Param('token') token: string) {
    return this.queryBus.execute(new GetAllRuleByTokenQuery(token))
  }

  @Get('application/:token/:packageName')
  getRulesByApplication(@Param() getRulesByPackageDto: GetRulesByPackageDto) {
    console.log(getRulesByPackageDto)
    return this.queryBus.execute(new GetRulesByApplicationQuery(getRulesByPackageDto))
  }

  @Post()
  createRule(@Body() createRuleDto: CreateRuleDto) {
    return this.commandBus.execute(new CreateRuleApplicationCommand(createRuleDto))
  }

  @Patch(':id')
  updateRule(@Param('id', ParseIntPipe) id: number, @Body() updateRuleDto: UpdateRuleDto) {
    return this.commandBus.execute(new UpdateRuleCommand(updateRuleDto, id))
  }

  @Delete(':id')
  deleteRule(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteRuleByIdCommand(id))
  }
}
