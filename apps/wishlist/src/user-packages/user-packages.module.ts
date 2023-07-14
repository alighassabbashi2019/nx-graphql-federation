import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPackages } from './dto/user-packages.dto';
import { UserPackagesService } from './user-packages.service';
import { UserPackagesResolver } from './user-packages.resolver';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserPackages])],
  providers: [UsersResolver, UserPackagesService, UserPackagesResolver],
})
export class UserPackagesModule {}
