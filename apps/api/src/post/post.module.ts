import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './user.resolver';
import { Post, User, UserPosts } from './dto/post.dto';
import { UserPostsResolver } from './user-posts.resolver';
import { UserPostsService } from './user-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, UserPosts, User])],
  providers: [
    PostResolver,
    PostService,
    UsersResolver,
    UserPostsService,
    UserPostsResolver,
  ],
})
export class PostModule {}
