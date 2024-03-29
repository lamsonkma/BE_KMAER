import { AbstractEntity } from '@common/entities/abstract.entity'
import { ApplicationEntity } from '@root/modules/applications/entities/application.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('rule')
export class RuleEntity extends AbstractEntity {
  @ManyToOne(() => ApplicationEntity, (application) => application.rules)
  application: ApplicationEntity

  @Column()
  startTime: string

  @Column()
  endTime: string

  @Column({ default: false })
  enabled: boolean
}
