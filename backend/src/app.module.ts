import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
