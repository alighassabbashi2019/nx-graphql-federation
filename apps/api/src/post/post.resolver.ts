import { Query, Args, ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './dto/post.dto';
import { User } from './dto/post.dto';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => Post)
  findPost(@Args('id') id: number): Post {
    return this.postService.findOne(id);
  }

  @Query((returns) => [Post])
  getPosts(): Post[] {
    return this.postService.all();
  }

  @ResolveField((of) => User)
  user(@Parent() post: Post): any {
    return { __typename: 'User', id: post.authorId };
  }
}
