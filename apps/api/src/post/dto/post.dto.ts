import {
  Directive,
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field()
  @Directive('@external')
  id: string;

  @Field((type) => [Post])
  posts: Post[];
}

@Entity()
@ObjectType()
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

  @Column()
  @Field()
  userId: string;

  @Field((type) => User)
  user?: User;
}

@InputType()
export class CreatePostInput extends OmitType(
  Post,
  ['id', 'user'],
  InputType
) {}

@InputType()
export class PostFiltersInput extends PartialType(
  OmitType(CreatePostInput, ['userId']),
  InputType
) {}
