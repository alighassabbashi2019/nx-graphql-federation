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

  @Field(() => [Int])
  userPackagesIds: number[];
}

@ObjectType()
@Entity()
export class UserPackages {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field(() => Int)
  packageId: number;

  @Field(() => User)
  user: User;
}

@InputType()
export class assignInput extends OmitType(
  UserPackages,
  ['id', 'user'],
  InputType
) {}
