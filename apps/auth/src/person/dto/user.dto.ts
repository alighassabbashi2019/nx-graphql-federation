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

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field((type) => Int)
  age: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  passowrd: string;
}

@InputType()
export class CreateUserInput extends OmitType(User, ['id'], InputType) {}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(User, ['id', 'passowrd'], InputType)
) {}
