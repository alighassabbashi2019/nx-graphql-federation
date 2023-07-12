import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput, Post, PostConnectionArgs } from './dto/post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly _postRepo: Repository<Post>
  ) {}

  create(body: CreatePostInput): Promise<Post> {
    const createdPost = this._postRepo.create(body);
    return this._postRepo.save(createdPost);
  }

  findById(id: string): Promise<Post> {
    return this._postRepo.findOneBy({ id });
  }

  findUserPosts(userId: string, args: PostConnectionArgs): Promise<Post[]> {
    return this._postRepo.find({
      where: { userId },
      take: args.first,
      skip: +args.after,
    });
  }
}
