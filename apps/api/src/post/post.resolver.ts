import {
  Query,
  Args,
  ResolveField,
  Resolver,
  Parent,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput, Post } from './dto/post.dto';
import { User } from './dto/post.dto';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly _postService: PostService) {}

  @Query((returns) => Post, { name: 'post' })
  getPost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this._postService.findById(id);
  }

  @Query((returns) => [Post], { name: 'posts' })
  getPosts(): Promise<Post[]> {
    return this._postService.findAll();
  }

  @Mutation((returns) => Post)
  createPost(@Args('post') body: CreatePostInput): Promise<Post> {
    return this._postService.create(body);
  }
}
