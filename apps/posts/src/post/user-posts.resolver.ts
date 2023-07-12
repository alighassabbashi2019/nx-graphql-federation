import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostConnectionArgs, User } from './dto/post.dto';
import { Post } from './dto/post.dto';

@Resolver(() => User)
export class UserPostsResolver {
  constructor(private _postService: PostService) {}

  @ResolveField(() => [Post])
  posts(
    @Args() args: PostConnectionArgs,
    @Parent() user: User
  ): Promise<Post[]> {
    return this._postService.findUserPosts(user.id, args);
  }
}
