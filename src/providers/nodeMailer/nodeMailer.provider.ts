import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateMailDto } from '@root/modules/mail/dto/create-email.dto'
import * as nodeMailer from 'nodemailer'
import { Transporter } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
@Injectable()
export class NodeMalerService {
  smtpTransport: Transporter<SMTPTransport.SentMessageInfo>
  constructor(private readonly configService: ConfigService) {
    this.smtpTransport = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL_USER'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        refreshToken: this.configService.get('REFRESH_TOKEN'),
      },
    })
  }

  async sendEmail(mailDto: CreateMailDto): Promise<{ status: boolean }> {
    try {
      await this.smtpTransport.sendMail({
        ...mailDto,
        from: this.configService.get('EMAIL_USER'),
      })
      return {
        status: true,
      }
    } catch (error) {
      console.log(error)
      return {
        status: false,
      }
    }
  }
}
