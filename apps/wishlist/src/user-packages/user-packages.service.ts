import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPackages } from './dto/user-packages.dto';

@Injectable()
export class UserPackagesService {
  constructor(
    @InjectRepository(UserPackages)
    private readonly _userPackagesRepo: Repository<UserPackages>
  ) {}

  async findAll(): Promise<UserPackages[]> {
    return this._userPackagesRepo.find();
  }

  async getUserpackageIds(userId: string) {
    const userpackages = await this._userPackagesRepo.find({
      where: { userId },
    });
    return userpackages.map((userPackage) => userPackage.packageId);
  }

  assign(userId: string, packageId: number) {
    const assignment = this._userPackagesRepo.create({ userId, packageId });
    return this._userPackagesRepo.save(assignment);
  }
}
