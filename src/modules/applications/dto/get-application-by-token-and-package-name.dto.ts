import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetApplicationByTokenAndPackageNameDto {
  @ApiProperty()
  @IsString()
  packageName: string

  @ApiProperty()
  @IsString()
  token: string
}
