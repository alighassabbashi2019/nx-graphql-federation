import { Module, Post } from '@nestjs/common';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dto/user.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [PersonResolver, PersonService],
})
export class PersonModule {}
