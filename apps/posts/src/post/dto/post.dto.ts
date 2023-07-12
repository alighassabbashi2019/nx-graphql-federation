import {
  ArgsType,
  Directive,
  Field,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ConnectionEdge } from '../types/edge.type';
import { Connection } from '../types/connection.type';
import { ConnectionArgs } from '../types/args.type';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  userId: string;
}

@ObjectType()
export class PostConnectionEdge extends ConnectionEdge(Post) {}

@ObjectType()
export class PostConnection extends Connection(PostConnectionEdge) {}

@InputType()
export class CreatePostInput extends OmitType(Post, ['id'], InputType) {}

@ArgsType()
export class PostConnectionArgs extends ConnectionArgs {}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field()
  id: string;

  @Field(() => [PostConnection])
  posts: PostConnection;
}
