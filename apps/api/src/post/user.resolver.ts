import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './dto/post.dto';
import { User } from './dto/post.dto';
@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postService: PostService) {}

<<<<<<< HEAD
  @ResolveField((of) => [Post])
  async userPostItems(@Parent() user: User): Promise<Post[]> {
    return await this.postService.forUser(user.userPostItemIds);
=======
  @ResolveField((of) => [UserPosts])
  public async userPostItems(
    @Parent() user: User,
    @Args('postId') postId: number
  ): Promise<UserPosts[]> {
    console.log(user);
    return this.postService.forUser(user.id, postId);
>>>>>>> bb90dab2c61f6eb8e09b4c518cf5bd67fc61dc08
  }
}
