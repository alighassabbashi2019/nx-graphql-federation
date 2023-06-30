import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './dto/post.dto';
import { User } from './dto/post.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField((of) => [Post])
  public posts(@Parent() user: User): Post[] {
    return this.postService.forUser(user.id);
  }
}
