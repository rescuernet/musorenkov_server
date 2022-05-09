import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../entity/users/dto/create-user.dto";
import {UsersService} from "../entity/users/users.service";
import * as bcrypt from 'bcryptjs'
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private tokenService: TokenService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    const data = await this.tokenService.generateToken(user)
    return data
  }

  /*async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findOneByEmail(userDto.email)
    if(candidate){
      throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST)
    }
    const hashPasword = await bcrypt.hash(userDto.password,5)
    const user = await this.userService.create({...userDto,password: hashPasword,roles: [RolesEnum.SELLER]})
    return this.tokenService.generateToken(user)
  }*/


  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(userDto.email)
    if(user){
      const passwordEquals = await bcrypt.compare(userDto.password,user.password)
      if(passwordEquals){
        return user
      }else{
        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        /*throw new UnauthorizedException({message: 'Не корректные данные авторизации'})*/
      }
    }else{
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
      /*throw new UnauthorizedException({message: 'Не корректные данные авторизации'})*/
    }
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw new UnauthorizedException({message: 'Не корректные данные авторизации'})
    }
    const tokenData = await this.tokenService.verify(refreshToken)
    const tokenDB = await this.tokenService.findTokenDB(refreshToken)
    if(!tokenDB){
      throw new UnauthorizedException({message: 'Не корректные данные авторизации'})
    }
    const userData = this.userService.findOne(tokenData.id)
    if(!userData){
      throw new UnauthorizedException({message: 'Не корректные данные авторизации'})
    }
    return this.tokenService.generateToken(await userData)
  }

  async logout(userId) {
    return await this.tokenService.removeToken(userId);
  }


}
