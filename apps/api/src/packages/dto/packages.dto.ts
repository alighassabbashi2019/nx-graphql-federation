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

  @Field(() => [Int])
  @Directive('@external')
  userPackagesIds: number[];

  @Field(() => [Packages])
  @Directive('@requires(fields: "userPackagesIds")')
  userPackagesItems: Packages[];
}

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Packages {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field(() => Int)
  count: number;
}

@InputType()
export class CreatePackagesInput extends OmitType(
  Packages,
  ['id'],
  InputType
) {}

@InputType()
export class PackagesFiltersInput extends PartialType(
  CreatePackagesInput,
  InputType
) {}
