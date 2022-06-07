import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { UserDto } from 'src/dtos/user.dto';
import { NotFoundError } from 'rxjs';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserPasswordDto } from 'src/dtos/user-password.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find().exec();
  }

  async find(id: number): Promise<UserDto> {
    return await this.userModel.findOne({ id: id }).exec();
  }

  async findUser(name: String): Promise<UserDto> {
    const existingUser = await this.userModel.findOne({ name: name }).exec();
    if (existingUser === null) {
      throw new HttpException("User not found", 404);
    }
    return existingUser;
  }

  async loginUser(user: UserLoginDto): Promise<Number> {
    const existingUser = await this.findUser(user.name);
    if (existingUser.password !== user.password) {
      throw new HttpException("Incorrect credentials", 404);
    }
    return existingUser.id;
  }

  async signUpUser(user: UserLoginDto): Promise<UserDto> {
    const lastUser = await (await this.findAll()).sort((user1, user2) => { 
      return (user1.id < user2.id) ? 1 : -1; 
    });
    var id;
    if (lastUser.length === 0) {
      id = 1;
    } else {
      id = lastUser[0].id + 1;
    }
    const newUser = {id: id, name: user.name, password: user.password};
    return this.create(newUser);
  }

  async create(user: UserDto): Promise<UserDto> {
    const existingUser = await this.userModel.findOne({ name: user.name }).exec();
    if (existingUser !== null) {
      throw new HttpException("An user with this username already exists", 400);
    }
    const newUser = await new this.userModel(user);
    return newUser.save();
  }

  async update(id: number, user: UserPasswordDto): Promise<UserDto> {
    return await this.userModel
      .findOneAndUpdate({ id: id }, user, { new: true })
      .exec();
  }

  async delete(id: number): Promise<UserDto> {
    return await this.userModel.findOneAndRemove({ id: id }).exec();
  }
}
