import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {RolesEnum} from "../roles/dto/roles.enum";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findOneByEmail(userDto.email)
    if(candidate){
      throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST)
    }
    const hashPasword = await bcrypt.hash(userDto.password,5)
    const user = await this.userService.create({...userDto,password: hashPasword,roles: [RolesEnum.SELLER]})
    return this.generateToken(user)
  }

  private async generateToken(user:CreateUserDto){
    const payload = {email: user.email, id: user._id, roles:user.roles}
    return {
      token: this.jwtService.sign(payload),
      tokenRefresh: this.jwtService.sign({id: payload.id}, {expiresIn: '30d'})
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password,user.password)
    if(user && passwordEquals){
      return user
    }
    throw new UnauthorizedException({message: 'Не корректные данные авторизации'})
  }
}
