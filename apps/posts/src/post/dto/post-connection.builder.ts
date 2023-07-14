import { ConnectionBuilder } from '../builders/connection.builder';
import { Post, PostConnection, PostConnectionEdge } from './post.dto';

type PostCursordata = string;

export class PostConnectionBuilder extends ConnectionBuilder<
  PostConnection,
  PostConnectionEdge,
  Post,
  PostCursordata
> {
  protected getCursorData(node: Post): PostCursordata {
    return node.id;
  }

  protected isValidCursorData(data: unknown): boolean {
    return typeof data === 'string' && data.length > 0;
  }

  protected getCursorDataError(name: 'after' | 'before', value: string): Error {
    return new Error(`cursor argument ${name} is invalid value ${value}`);
  }
}
