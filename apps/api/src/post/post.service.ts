import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  findOne(id: number) {
    return null;
  }
  all() {
    return [];
  }
  forUser(id: string) {
    return [];
  }
}
