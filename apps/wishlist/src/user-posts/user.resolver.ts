import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './dto/user-posts.dto';
import { UserPostsService } from './user-posts.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userPostsService: UserPostsService) {}

  @ResolveField((type) => [Int], { name: 'userPostItemIds' })
  async userPostItemIds(@Parent() user: User) {
    return await this.userPostsService.getUserPostIds(user.id);
  }
}
