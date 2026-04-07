import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
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
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtAuthService: JwtAuthService,
    private config: ConfigService,
  ) {}

  private generateAuthTokens(user: User) {
    //Create payload from user object first
    const payload = this.jwtAuthService.getUserPayload(
      user,
      JwtTokenPurpose.AUTH,
    );
    const expiry = this.config.getOrThrow<string>('JWT_ACCESS_EXPIRY');
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    console.log("Generating token with payload:", payload);
    console.log("Using secret:", secret);
    console.log("Token expiry:", expiry);
    const accessToken = this.jwtAuthService.generateToken(
      payload,
      secret,
      expiry,
    );
    console.log("Generated access token:", accessToken);
    const refreshExpiry = this.config.getOrThrow<string>('JWT_REFRESH_EXPIRY');
    console.log("Refresh token expiry:", refreshExpiry);
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    console.log("Refresh token secret:", refreshSecret);
    const refreshToken = this.jwtAuthService.generateToken(
      payload,
      refreshSecret,
      refreshExpiry,
    );
    console.log("Generated refresh token:", refreshToken);
    return { accessToken, refreshToken };
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const email = createUserDto.email.trim().toLowerCase();
      const existingUser = await this.userModel.findOne({ email: email });
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
      throw error;
    }
  }
  async login(loginDto: LoginUserDto) {
    const email = loginDto.email.trim().toLowerCase();
    const password = loginDto.password;
    const user = await this.userModel.findOne({ email }).select('+password');
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
  async findById(id: string) {
    const user = await this.userModel.findById(id)
      .select('-password') // Exclude sensitive data
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
