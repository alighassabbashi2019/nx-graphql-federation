import {
  Args,
  Directive,
  Mutation,
  Parent,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { User, UserPosts, assignInput } from './dto/user-posts.dto';
import { UserPostsService } from './user-posts.service';
import { Query } from '@nestjs/graphql';

@Resolver((of) => UserPosts)
export class UserPostsResolver {
  constructor(private readonly userPostsService: UserPostsService) {}

<<<<<<< HEAD:apps/wishlist/src/user-posts/user-posts.resolver.ts
  @Query((returns) => [UserPosts])
  getUserPosts() {
    return this.userPostsService.findAll();
  }

  @ResolveField((of) => User)
  @Directive('@provides(fields: "name")')
  user(@Parent() userPosts: UserPosts): any {
    // return
    return {
      id: 'cf9c0db9-382c-4972-a0cc-4033e6217295',
      name: 'emad',
      age: 23,
    };
=======
  @Query((returns) => [UserPosts], { name: 'userPosts' })
  async getUserPosts(): Promise<UserPosts[]> {
    return this.userPostsService.findAll();
  }

  @ResolveField((type) => [String])
  userPostItemIds(@Parent() userPosts: UserPosts) {
    return this.postService.forUser(userPosts.userId, userPosts.postId);
>>>>>>> bb90dab2c61f6eb8e09b4c518cf5bd67fc61dc08:apps/api/src/post/user-posts.resolver.ts
  }

  @Mutation((returns) => UserPosts)
  assignPostToUser(@Args('ids') userAndPostId: assignInput) {
    return this.userPostsService.assign(
      userAndPostId.userId,
      userAndPostId.postId
    );
  }
}
