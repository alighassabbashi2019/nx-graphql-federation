import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post, PostFiltersInput, UserPosts } from './dto/post.dto';
import { User } from './dto/post.dto';
@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField((of) => [UserPosts])
  public async userPostItems(
    @Parent() user: User,
    @Args('postId') postId: number
  ): Promise<UserPosts[]> {
    console.log(user);
    return this.postService.forUser(user.id, postId);
  }
}
