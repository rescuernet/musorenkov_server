import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";


@Controller('/api')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res() res) {
        const data = await this.authService.login(userDto);
        res.cookie('refreshToken', data.tokens.tokenRefresh, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.json({user: data.user,token:data.tokens.token});
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }


    @Get('/refresh')
    async refreshToken(@Req() req, @Res() res) {
        const {refreshToken} = req.cookies;
        const data = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', data.tokens.tokenRefresh, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.json({user: data.user,token:data.tokens.token});
    }

    @Get('/auth-me')
    async authMe(@Req() req, @Res() res) {
        const {refreshToken} = req.cookies;
        const data = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', data.tokens.tokenRefresh, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.json({user: data.user,token:data.tokens.token});
    }

}
