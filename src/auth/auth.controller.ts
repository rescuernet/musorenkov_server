import {Controller, Post, Body, UseGuards, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {JwtAuthGuard} from "./jwt-auth-guard";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
 async login(@Body() userDto: CreateUserDto, @Res() res) {
    const tokens = await this.authService.login(userDto);
    res.cookie('refreshToken', tokens.tokenRefresh, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true,sameSite: 'none'});
    return res.json(tokens);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

}
