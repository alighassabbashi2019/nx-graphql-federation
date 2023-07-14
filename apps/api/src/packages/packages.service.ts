import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePackagesInput, Packages } from './dto/packages.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Packages)
    private readonly _PackagesRepo: Repository<Packages>
  ) {}

  create(body: CreatePackagesInput): Promise<Packages> {
    const createdPackages = this._PackagesRepo.create(body);
    return this._PackagesRepo.save(createdPackages);
  }

  findById(id: number): Promise<Packages> {
    return this._PackagesRepo.findOne({ where: { id } });
  }

  findAll(): Promise<Packages[]> {
    return this._PackagesRepo.find();
  }

  forUser(ids: number[]): Promise<Packages[]> {
    return this._PackagesRepo.findBy({ id: In(ids) });
  }
}
