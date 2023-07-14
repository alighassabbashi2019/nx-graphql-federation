import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './dto/user-packages.dto';
import { UserPackagesService } from './user-packages.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly _userPackagesService: UserPackagesService) {}

  @ResolveField(() => [Int], { name: 'userPackagesIds' })
  userPackagesIds(@Parent() user: User): Promise<number[]> {
    return this._userPackagesService.getUserpackageIds(user.id);
  }
}
