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

  @Field((type) => [Int])
  @Directive('@external')
  userPostItemIds: number[];

  @Field((type) => [Post])
  @Directive('@requires(fields: "userPostItemIds")')
  userPostItems: Post[];
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

@InputType()
export class CreatePostInput extends OmitType(Post, ['id'], InputType) {}

@InputType()
export class PostFiltersInput extends PartialType(CreatePostInput, InputType) {}
