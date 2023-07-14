import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Query } from '@nestjs/graphql';
import { CreatePostInput, Post } from './dto/post.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly _postService: PostService) {}

  @Query(() => Post)
  getPost(@Args('id') id: string) {
    return this._postService.findById(id);
  }

  @Query(() => [Post])
  getPosts(): Promise<Post[]> {
    return this._postService.findAll();
  }

  @Mutation(() => Post)
  createNewPost(@Args('body') body: CreatePostInput): Promise<Post> {
    return this._postService.create(body);
  }
}
