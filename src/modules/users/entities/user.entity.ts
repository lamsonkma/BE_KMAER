import { AbstractEntity } from '@common/entities/abstract.entity'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToMany } from 'typeorm'

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  email: string

  @Column()
  name: string

  @Column()
  @Exclude()
  password: string

  @ManyToMany(() => DeviceEntity)
  devices: DeviceEntity[]
}
