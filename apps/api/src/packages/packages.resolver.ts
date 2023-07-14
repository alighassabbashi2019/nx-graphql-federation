import { Query, Args, Resolver, Mutation, Int } from '@nestjs/graphql';
import { PackagesService } from './packages.service';
import { CreatePackagesInput, Packages } from './dto/packages.dto';

@Resolver(() => Packages)
export class PackagesResolver {
  constructor(private readonly _packagesService: PackagesService) {}

  @Query(() => Packages, { name: 'Packages' })
  getPackages(@Args('id', { type: () => Int }) id: number): Promise<Packages> {
    return this._packagesService.findById(id);
  }

  @Query(() => [Packages], { name: 'Packagess' })
  getPackagess(): Promise<Packages[]> {
    return this._packagesService.findAll();
  }

  @Mutation(() => Packages)
  createPackages(
    @Args('Packages') body: CreatePackagesInput
  ): Promise<Packages> {
    return this._packagesService.create(body);
  }
}
