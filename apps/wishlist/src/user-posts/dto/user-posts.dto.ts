import { Post } from '@nestjs/common';
import {
  ObjectType,
  Field,
  Int,
  InputType,
  OmitType,
  Directive,
} from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field()
  @Directive('@external')
  id: string;

  @Field()
  @Directive('@external')
  name: string;

  @Field((type) => [Int])
  userPostItemIds: number[];
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

  @Field((type) => User)
  user: User;
}

@InputType()
export class assignInput extends OmitType(
  UserPosts,
  ['id', 'user'],
  InputType
) {}
