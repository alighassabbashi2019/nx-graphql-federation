import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostConnection, PostConnectionArgs, User } from './dto/post.dto';
import { PostConnectionBuilder } from './dto/post-connection.builder';

@Resolver(() => User)
export class UserPostsResolver {
  constructor(private _postService: PostService) {}

  @ResolveField(() => PostConnection, { nullable: true })
  public async posts(
    @Args() args: PostConnectionArgs,
    @Parent() user: User
  ): Promise<null | PostConnection> {
    const maxEdgesToReturn = 20;
    const connectionBuilder = new PostConnectionBuilder(args, maxEdgesToReturn);
    const { after, before } = connectionBuilder;
    const totalEdges = await this._postService.countUserPosts(user.id, {
      after,
      before,
    });
    const { skip, take } = connectionBuilder.getBounds(totalEdges);
    const posts = await this._postService.findUserPosts(user.id, {
      after,
      before,
      skip,
      take,
    });
    return connectionBuilder.build(posts, totalEdges);
  }
}
