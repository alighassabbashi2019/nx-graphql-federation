import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PostModule } from '../post/post.module';
import { join } from 'path';
import { User } from '../post/dto/post.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'post.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), '/apps/api/src/assets/schema.gql'),
      useGlobalPrefix: true,
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
