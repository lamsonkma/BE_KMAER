import { Query } from '@nestjs-architects/typed-cqrs'
export class GetDeviceByUserIdQuery extends Query<any> {
  constructor(public readonly userId: number) {
    super()
  }
}
