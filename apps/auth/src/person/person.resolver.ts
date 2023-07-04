import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput, User, UserFilterInput } from './dto/user.dto';
import { PersonService } from './person.service';

@Resolver((of) => User)
export class PersonResolver {
  constructor(private readonly _personService: PersonService) {}

  @Query((returns) => User, { name: 'user' })
  getUser(@Args('id') id: string): Promise<User> {
    return this._personService.findById(id);
  }

  @Query((returns) => [User], { name: 'users' })
  async getUsers(
    @Args('userFilters') userFilters: UserFilterInput
  ): Promise<User[]> {
    return this._personService.findAll(userFilters);
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
    console.log(body);

    return this._personService.create(body);
  }
}
