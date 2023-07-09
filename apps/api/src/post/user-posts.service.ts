import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostInput, Post, UserPosts } from './dto/post.dto';

@Injectable()
export class UserPostsService {
  constructor(
    @InjectRepository(Post) private readonly _postRepo: Repository<Post>,
    @InjectRepository(UserPosts)
    private readonly _userPostsRepo: Repository<UserPosts>
  ) {}

  findAll() {
    return this._userPostsRepo.find();
  }

  assign(userId: string, postId: number) {
    const assignment = this._userPostsRepo.create({ userId, postId });
    return this._userPostsRepo.save(assignment);
  }
}
