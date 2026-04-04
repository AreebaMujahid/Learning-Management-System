import { Injectable, ConflictException, InternalServerErrorException, BadRequestException , UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/input/create-user.dto';
import { JwtAuthService } from 'src/shared/jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import { JwtTokenPurpose } from 'src/utils/enums/jwt-token-purpose';
import { LoginUserDto } from './dto/input/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
  private jwtAuthService: JwtAuthService,
  private config: ConfigService,) {}

  private generateAuthTokens(user: User) {
    //Create payload from user object first
    const payload = this.jwtAuthService.getUserPayload(
      user,
      JwtTokenPurpose.AUTH,
    );
    const expiry = this.config.getOrThrow<string>('JWT_ACCESS_EXPIRY');
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const accessToken = this.jwtAuthService.generateToken(
      payload,
      secret,
      expiry,
    );
    const refreshExpiry = this.config.getOrThrow<string>('JWT_REFRESH_EXPIRY');
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    const refreshToken = this.jwtAuthService.generateToken(
      payload,
      refreshSecret,
      refreshExpiry,
    );
    return { accessToken, refreshToken };
  }
  async create(createUserDto: CreateUserDto){
    try {
      const email = createUserDto.email.trim().toLowerCase();
      const existingUser = await this.userModel.findOne({ email: email});
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new this.userModel({
        ...createUserDto,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      const tokens = this.generateAuthTokens(savedUser);
      return tokens;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }
  async login(loginDto: LoginUserDto) {
    const email = loginDto.email.trim().toLowerCase();
    const password = loginDto.password;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.isArchived || !user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = this.generateAuthTokens(user);
    return tokens;
  }
}