import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostInput, Post, UserPosts } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly _postRepo: Repository<Post>,
    @InjectRepository(UserPosts)
    private readonly _userPostsRepo: Repository<UserPosts>
  ) {}

  create(body: CreatePostInput): Promise<Post> {
    const createdPost = this._postRepo.create(body);
    return this._postRepo.save(createdPost);
  }

  findById(id: number): Promise<Post> {
    return this._postRepo.findOne({ where: { id } });
  }

  findAll(): Promise<Post[]> {
    return this._postRepo.find();
  }

  forUser(id: string, postId: number): Promise<UserPosts[]> {
    return this._userPostsRepo.findBy({ userId: id, postId });
  }
}
