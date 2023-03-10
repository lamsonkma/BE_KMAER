import { PartialType } from '@nestjs/swagger'

import { CreateTokenDto } from './create-token.dto'

export class UpdateTOkenDto extends PartialType(CreateTokenDto) {
  id: number
}
