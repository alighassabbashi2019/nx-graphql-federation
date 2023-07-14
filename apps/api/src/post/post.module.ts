import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './user.resolver';
import { Post, User } from './dto/post.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostResolver, PostService, UsersResolver],
})
export class PostModule {}
