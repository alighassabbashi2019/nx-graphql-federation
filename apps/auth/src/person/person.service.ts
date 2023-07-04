import { Injectable } from '@nestjs/common';
import { CreateUserInput, User, UserFilterInput } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>
  ) {}

  create(body: CreateUserInput): Promise<User> {
    const createdUser = this._userRepo.create(body);
    return this._userRepo.save(createdUser);
  }

  findById(id: string): Promise<User> {
    return this._userRepo.findOne({ where: { id } });
  }

  findAll(userFilters?: UserFilterInput): Promise<User[]> {
    return this._userRepo.find({ where: { ...userFilters } });
  }
}
