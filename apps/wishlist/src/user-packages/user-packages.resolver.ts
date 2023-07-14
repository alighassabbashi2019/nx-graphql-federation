import {
  Args,
  Directive,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, UserPackages, assignInput } from './dto/user-packages.dto';
import { UserPackagesService } from './user-packages.service';
import { Query } from '@nestjs/graphql';

@Resolver(() => UserPackages)
export class UserPackagesResolver {
  constructor(private readonly userPackagesService: UserPackagesService) {}

  @Query(() => [UserPackages])
  getUserPackages() {
    return this.userPackagesService.findAll();
  }

  @ResolveField(() => User)
  @Directive('@provides(fields: "name")')
  user(@Parent() userPackages: UserPackages): any {
    return {
      __typename: 'User',
      id: userPackages.userId,
      name: 'emad',
    };
  }

  @Mutation(() => UserPackages)
  assignPackageToUser(@Args('userAndPackage') userAndPackage: assignInput) {
    return this.userPackagesService.assign(
      userAndPackage.userId,
      userAndPackage.packageId
    );
  }
}
