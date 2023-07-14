import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Query } from '@nestjs/graphql';
import { CreatePostInput, Post } from './dto/post.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly _postService: PostService) {}

  @Query((type) => Post)
  getPost(@Args('id') id: string) {
    return this._postService.findById(id);
  }

  @Mutation((type) => Post)
  createNewPost(@Args('body') body: CreatePostInput): Promise<Post> {
    return this._postService.create(body);
  }
}
