import {
  Directive,
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field()
  @Directive('@external')
  id: string;

  @Field((type) => [String])
  userPostItemIds: string[];

  @Field((type) => [UserPosts])
  @Directive('@requires(fields: "userPostItemIds")')
  userPostItems: UserPosts[];
}

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field((type) => Int)
  votes: number;
}

@ObjectType()
@Entity()
export class UserPosts {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field((type) => Int)
  postId: number;
}

@InputType()
export class assignInput extends OmitType(UserPosts, ['id'], InputType) {}

@InputType()
export class CreatePostInput extends OmitType(Post, ['id'], InputType) {}

@InputType()
export class PostFiltersInput extends PartialType(CreatePostInput, InputType) {}
