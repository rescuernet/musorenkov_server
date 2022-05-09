import {Injectable} from '@nestjs/common';
import {CreateClientDto} from './dto/create-client.dto';
import {UpdateClientDto} from './dto/update-client.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Client, ClientDocument} from "./clients.schema";

@Injectable()
export class ClientsService {

  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {}

  async create(dto: CreateClientDto) {
    const client = new this.clientModel(dto)
    return client.save()
  }

  findAll() {
    return this.clientModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
