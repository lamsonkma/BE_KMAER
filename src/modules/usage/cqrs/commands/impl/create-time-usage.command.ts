import { Command } from '@nestjs-architects/typed-cqrs'
import { CreateUsageDto } from '@root/modules/usage/dto/create-usage.dto'
import { UsageEntity } from '@root/modules/usage/entities/usage.entity'
export class CreateTimeUsageCommand extends Command<UsageEntity> {
  constructor(public readonly dto: CreateUsageDto) {
    super()
  }
}
