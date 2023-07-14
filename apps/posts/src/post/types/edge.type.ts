import { Type } from '@nestjs/common';
import { Field, GqlTypeReference, ObjectType } from '@nestjs/graphql';

export interface ConnectionEdge<T> {
  cursor: string;
  node: T;
}

export function ConnectionEdge<T extends GqlTypeReference>(
  classRef: Type<T>
): Type<ConnectionEdge<T>> {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType implements ConnectionEdge<T> {
    @Field(() => String)
    public cursor: string;

    @Field(() => classRef)
    public node: T;
  }
  return EdgeType as Type<ConnectionEdge<T>>;
}
