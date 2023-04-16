import { PartialType } from '@nestjs/swagger'

import { CreateOptDto } from './create-otp.dto'

export class VerifyOtpDto extends PartialType(CreateOptDto) {}
