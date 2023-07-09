import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post, PostFiltersInput, UserPosts } from './dto/post.dto';
import { User } from './dto/post.dto';
@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField((of) => [UserPosts])
  public async userPostItems(@Parent() user: User): Promise<UserPosts[]> {
    return this.postService.forUser(user.userPostItemIds);
  }
}
