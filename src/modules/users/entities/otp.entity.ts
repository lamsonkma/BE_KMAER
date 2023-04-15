import { AbstractEntity } from '@common/entities/abstract.entity'
import { UsageEntity } from '@root/modules/usage/entities/usage.entity'
import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('otp')
export class OtpEntity extends AbstractEntity {
  @Column()
  email: string

  @Column()
  name: string

  @Column()
  @Exclude()
  password: string

  @ManyToOne(() => UsageEntity, (user) => user.otps)
  user: UsageEntity
}
