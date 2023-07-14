import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePostInput,
  FindUserPostsFilters,
  Post,
  PostCountFilters,
} from './dto/post.dto';
import { LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly _postRepo: Repository<Post>
  ) {}

  create(body: CreatePostInput): Promise<Post> {
    const createdPost = this._postRepo.create(body);
    return this._postRepo.save(createdPost);
  }

  findAll() {
    return this._postRepo.find();
  }

  findById(id: string): Promise<Post> {
    return this._postRepo.findOneBy({ id });
  }

  countUserPosts(
    userId: string,
    cursorData: PostCountFilters
  ): Promise<number> {
    const findWhereOptions = [];
    if (cursorData.after) {
      findWhereOptions.push({ userId: MoreThan(cursorData.after) });
    }
    if (cursorData.before) {
      findWhereOptions.push({ userId: LessThan(cursorData.before) });
    }
    return this._postRepo.count({
      where: [...findWhereOptions, { userId }],
    });
  }

  findUserPosts(userId: string, args: FindUserPostsFilters): Promise<Post[]> {
    const findWhereOptions = [];
    if (args.after) {
      findWhereOptions.push({ userId: MoreThan(args.after) });
    }
    if (args.before) {
      findWhereOptions.push({ userId: LessThan(args.before) });
    }
    return this._postRepo.find({
      where: [...findWhereOptions, { userId }],
      order: { id: 'ASC' },
      take: args.take,
      skip: args.skip,
    });
  }
}
