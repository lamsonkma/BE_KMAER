import { AbstractEntity } from '@common/entities/abstract.entity'
import { DayOfWeek } from '@root/constants/day-of-week.enum'
import { ApplicationEntity } from '@root/modules/applications/entities/application.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('usage')
export class UsageEntity extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  dayOfWeek: DayOfWeek

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalTimeInForeground: number

  @ManyToOne(() => ApplicationEntity, (application) => application.usages)
  application: ApplicationEntity
}
