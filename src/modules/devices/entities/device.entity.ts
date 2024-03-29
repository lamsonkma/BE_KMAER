import { AbstractEntity } from '@common/entities/abstract.entity'
import { ApplicationEntity } from '@root/modules/applications/entities/application.entity'
import { UserEntity } from '@root/modules/users/entities/user.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

@Entity('device')
export class DeviceEntity extends AbstractEntity {
  @Column()
  name: string

  @Column()
  image: string

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[]

  @OneToMany(() => ApplicationEntity, (application) => application.device)
  applications: ApplicationEntity[]

  @Column()
  token: string
}
