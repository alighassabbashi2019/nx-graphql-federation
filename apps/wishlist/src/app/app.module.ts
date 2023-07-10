import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { User } from '../user-posts/dto/user-posts.dto';
import { UserPostsModule } from '../user-posts/user-posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'userPosts.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(
        process.cwd(),
        '/apps/wishlist/src/assets/schema.gql'
      ),
      useGlobalPrefix: true,
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    UserPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
