import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
export class GetRulesByPackageDto {
  @IsString()
  @ApiProperty()
  packageName: string

  @IsString()
  @ApiProperty()
  token: string
}
