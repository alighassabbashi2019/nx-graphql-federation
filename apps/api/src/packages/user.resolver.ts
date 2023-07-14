import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PackagesService } from './packages.service';
import { Packages } from './dto/packages.dto';
import { User } from './dto/packages.dto';
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly PackagesService: PackagesService) {}

  @ResolveField(() => [Packages])
  userPackagesItems(@Parent() user: User): Promise<Packages[]> {
    return this.PackagesService.forUser(user.userPackagesIds);
  }
}
