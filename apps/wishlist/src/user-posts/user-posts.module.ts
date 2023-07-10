import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPosts } from './dto/user-posts.dto';
import { UserPostsService } from './user-posts.service';
import { UserPostsResolver } from './user-posts.resolver';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserPosts])],
  providers: [UsersResolver, UserPostsService, UserPostsResolver],
})
export class UserPostsModule {}
