import { Type } from '@nestjs/common';
import { ConnectionEdge } from './edge.type';
import { Field, GqlTypeReference, ObjectType } from '@nestjs/graphql';
import { PageInfo } from './page-info.type';

export interface Connection<E extends ConnectionEdge<GqlTypeReference>> {
  pageInfo: PageInfo;
  edges: E[];
}

export function Connection<E extends ConnectionEdge<GqlTypeReference>>(
  EdgeType: Type<E>
): Type<Connection<E>> {
  @ObjectType({ isAbstract: true })
  class _Connection {
    @Field()
    public readonly pageInfo!: PageInfo;

    @Field(() => EdgeType)
    public readonly edges: E[];
  }
  return _Connection;
}
