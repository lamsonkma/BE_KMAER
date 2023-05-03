import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { DeviceController } from './controllers/device.controller'
import { CreateDeviceCommandHandler } from './cqrs/commands/handler/create-device.handler'
import { RemoveUserFromDeviceCommandHandler } from './cqrs/commands/handler/remove-user-from-device.handler'
import { UpdateDeviceCommandHandler } from './cqrs/commands/handler/update-device.handler'
import { GetDeviceByIdQueryHandler } from './cqrs/queries/handler/get-device-by-id.handler'
import { GetDeviceByTokenQueryHandler } from './cqrs/queries/handler/get-device-by-token.handler'
import { GetDeviceByUserIdQueryHandler } from './cqrs/queries/handler/get-device-by-user-id.handler'
import { DeviceRepository } from './repositories/device.repository'

const QueryHandlers = [GetDeviceByIdQueryHandler, GetDeviceByTokenQueryHandler, GetDeviceByUserIdQueryHandler]
const CommandHandlers = [CreateDeviceCommandHandler, UpdateDeviceCommandHandler, RemoveUserFromDeviceCommandHandler]

@Module({
  providers: [...QueryHandlers, ...CommandHandlers],
  controllers: [DeviceController],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([DeviceRepository])],
})
export class DeviceModule {}
