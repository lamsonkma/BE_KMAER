import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { ApplicationController } from './controllers/apllication.controller'
import { CreateApplicationCommandHandler } from './cqrs/commands/handler/create-application.handler'
import { GetOneAppByIdQueryHandler } from './cqrs/queries/handler/get-one-app-by-id.handler'
import { ApplicationRepository } from './repositories/application.repository'

const QueryHandlers = [GetOneAppByIdQueryHandler]
const CommandHandlers = [CreateApplicationCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [ApplicationController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([ApplicationRepository])],
})
export class ApplicationModule {}
