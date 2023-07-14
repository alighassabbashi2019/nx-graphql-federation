import { Module } from '@nestjs/common';
import { PackagesResolver } from './packages.resolver';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './user.resolver';
import { Packages } from './dto/packages.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Packages])],
  providers: [PackagesResolver, PackagesService, UsersResolver],
})
export class PackagesModule {}
