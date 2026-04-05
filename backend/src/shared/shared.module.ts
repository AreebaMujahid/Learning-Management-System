import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt.service';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_ACCESS_SECRET') as string,
        signOptions: {
          expiresIn: '15',
        },
      }),
    }),
  ],
  providers: [JwtAuthService, CloudinaryProvider, CloudinaryService],
  exports: [JwtAuthService, CloudinaryProvider, CloudinaryService], 
})
export class SharedModule {}
