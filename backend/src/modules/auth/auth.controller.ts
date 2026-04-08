import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/input/create-user.dto';
import { LoginUserDto } from './dto/input/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { CurrentUser } from '../../utils/decorators/user.decorator';
import type { JwtTokenPayload } from 'src/utils/types/token.payload';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/input/refresh-token.dto';
import * as express from 'express';
import { Request, Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { Req } from '@nestjs/common';
import * as Express from 'express';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    return await this.authService.create(createUserDto, response);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    return await this.authService.login(loginDto, response);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: JwtTokenPayload) {
    return this.authService.findById(user.userId);
  }

  @Post('refresh-token')
  async refreshAccessToken(@Req() req: Express.Request, @Res({ passthrough: true }) res: Express.Response) {
  const token = req.cookies['refreshToken'];
  if (!token) throw new UnauthorizedException();
  const result = await this.authService.refreshAccessToken(token);
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  return { accessToken: result.accessToken, user: result.user };
  } 

  @Post('logout')
  logout(@Res({ passthrough: true }) response: express.Response) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return { message: 'Logged out successfully' };
  }
}
