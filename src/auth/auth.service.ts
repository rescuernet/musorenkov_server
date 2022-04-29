import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/user.schema";
import * as bcrypt from 'bcryptjs'
import {threadId} from "worker_threads";

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
    const user = await this.userService.create({...userDto,password: hashPasword})
    return this.generateToken(user)
  }

  private async generateToken(user){
    const payload = {email: user.email, id: user._id}
    return {
      token: this.jwtService.sign(payload)
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
