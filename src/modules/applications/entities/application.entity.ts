import { AbstractEntity } from '@common/entities/abstract.entity'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity('application')
export class ApplicationEntity extends AbstractEntity {
  @ManyToOne(() => DeviceEntity, (device) => device.applications)
  device: DeviceEntity

  @OneToMany(() => RuleEntity, (rule) => rule.application)
  rules: RuleEntity[]

  @Column()
  name: string

  @Column()
  image: string

  @Column()
  timeUsed: number
}
