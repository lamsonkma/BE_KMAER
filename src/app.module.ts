import { UserModule } from '@modules/users/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { appConfiguration } from './configurations/app.config'
import { jwtConfiguration } from './configurations/jwt.config'
import { typeormConfiguration } from './configurations/typeorm.config'
import { ApplicationModule } from './modules/applications/application.module'
import { AuthModule } from './modules/auth/auth.module'
import { DeviceModule } from './modules/devices/device.module'
import { RuleModule } from './modules/rules/rule.module'
import { TokenModule } from './modules/tokens/token.module'

const appModules = [AuthModule, UserModule, DeviceModule, TokenModule, ApplicationModule, RuleModule]

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [appConfiguration, typeormConfiguration, jwtConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('orm'),
    }),
    ...appModules,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
