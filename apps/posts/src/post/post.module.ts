import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './dto/post.dto';
import { UserPostsResolver } from './user-posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostResolver, PostService, UserPostsResolver],
})
export class PostModule {}
