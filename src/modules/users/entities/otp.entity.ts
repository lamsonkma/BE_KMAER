import { AbstractEntity } from '@common/entities/abstract.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

import { UserEntity } from './user.entity'

@Entity('otp')
export class OtpEntity extends AbstractEntity {
  @Column()
  code: string

  @ManyToOne(() => UserEntity, (user) => user.otps)
  user: UserEntity
}
