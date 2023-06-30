import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput, User } from './dto/user.dto';
import { PersonService } from './person.service';

@Resolver((of) => User)
export class PersonResolver {
  constructor(private readonly _personService: PersonService) {}

  @Query((returns) => User, { name: 'user' })
  getUser(@Args('id') id: string): Promise<User> {
    return this._personService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User> {
    return this._personService.findById(reference.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('user') body: CreateUserInput) {
    this._personService.create(body);
  }
}
