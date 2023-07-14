import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput, User, UserFilterInput } from './dto/user.dto';
import { PersonService } from './person.service';

@Resolver(() => User)
export class PersonResolver {
  constructor(private readonly _personService: PersonService) {}

  @Query(() => User, { name: 'user' })
  getUser(@Args('id') id: string): Promise<User> {
    return this._personService.findById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(
    @Args('userFilters') userfilters: UserFilterInput
  ): Promise<User[]> {
    return this._personService.findAll(userfilters);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User> {
    return this._personService.findById(reference.id);
  }

  @Mutation(() => User)
  createUser(@Args('user') body: CreateUserInput) {
    return this._personService.create(body);
  }
}
