import { AbstractEntity } from '@common/entities/abstract.entity'
import { DeviceEntity } from '@root/modules/devices/entities/device.entity'
import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'

import { OtpEntity } from './otp.entity'

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  email: string

  @Column()
  name: string

  @Column({
    nullable: true,
    default:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1683598712~exp=1683599312~hmac=b162c61d181a2e083a7dbb5efc299fb681fa84c42394c4b1d4fbb48a71040b07',
  })
  image: string

  @Column()
  @Exclude()
  password: string

  @ManyToMany(() => DeviceEntity)
  devices: DeviceEntity[]

  @OneToMany(() => OtpEntity, (otp) => otp.user)
  otps: OtpEntity[]
}
