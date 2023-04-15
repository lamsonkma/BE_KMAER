import { AbstractEntity } from '@common/entities/abstract.entity'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
import { RuleEntity } from '@root/modules/rules/entities/rule.entity'
import { UsageEntity } from '@root/modules/usage/entities/usage.entity'
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
  package: string

  @Column({ nullable: true })
  image: string

  @OneToMany(() => UsageEntity, (usage) => usage.application)
  usages: UsageEntity[]
}
