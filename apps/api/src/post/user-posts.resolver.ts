import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { UserPosts, assignInput } from './dto/post.dto';
import { UserPostsService } from './user-posts.service';
import { Query } from '@nestjs/graphql';

@Resolver((of) => UserPosts)
export class UserPostsResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userPostsService: UserPostsService
  ) {}

  @Query((returns) => UserPosts)
  getUserPosts() {
    return this.userPostsService.findAll();
  }

  @ResolveField((type) => [String])
  userPostItemIds(@Parent() userPosts: UserPosts) {
    return this.postService.forUser([userPosts.userId]);
  }

  @Mutation((returns) => UserPosts)
  assignPostToUser(@Args('ids') userAndPostId: assignInput) {
    return this.userPostsService.assign(
      userAndPostId.userId,
      userAndPostId.postId
    );
  }
}
