import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPosts } from './dto/user-posts.dto';

@Injectable()
export class UserPostsService {
  constructor(
    @InjectRepository(UserPosts)
    private readonly _userPostsRepo: Repository<UserPosts>
  ) {}

  async findAll(): Promise<UserPosts[]> {
    return this._userPostsRepo.find();
  }

  async getUserPostIds(userId: string) {
    const userPostIds = await this._userPostsRepo.find({ where: { userId } });
    return userPostIds.map((userPost) => userPost.postId);
  }

  assign(userId: string, postId: number) {
    const assignment = this._userPostsRepo.create({ userId, postId });
    return this._userPostsRepo.save(assignment);
  }
}
