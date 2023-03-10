import { AbstractEntity } from '@common/entities/abstract.entity'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('token')
export class TokenEntity extends AbstractEntity {
  @Column()
  tokenDevice: string

  @ManyToOne(() => DeviceEntity, (device) => device.tokens)
  @JoinColumn()
  device: DeviceEntity
}
