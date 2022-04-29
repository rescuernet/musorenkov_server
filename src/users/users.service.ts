import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./user.schema";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto:CreateUserDto) {
      const user = new this.userModel(dto)
      return user.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find()
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email:email})
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id,dto,{new: true})
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }
}
