import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateDeviceDto } from '@root/modules/devices/dto/create-device.dto'
export class CreateDeviceCommand extends Command<CreateDeviceDto> {
  constructor(public readonly dto: CreateDeviceDto, public readonly userId: undefined | number) {
    super()
  }
}
