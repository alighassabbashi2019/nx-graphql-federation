import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post, PostFiltersInput } from './dto/post.dto';
import { User } from './dto/post.dto';
@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField((of) => [Post], { nullable: 'itemsAndList' })
  public async posts(
    @Args('postFilters') postFilters: PostFiltersInput,
    @Parent() user: User
  ): Promise<Post[]> {
    const result = await this.postService.forUser(user.id, postFilters);
    return this.postService.forUser(user.id, postFilters);
  }
}
