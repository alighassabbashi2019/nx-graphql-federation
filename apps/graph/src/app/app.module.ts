import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { serializeQueryPlan } from '@apollo/query-planner';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {},
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'person', url: 'http://localhost:3000/api/graphql' },
            { name: 'packages', url: 'http://localhost:3001/api/graphql' },
            { name: 'posts', url: 'http://localhost:3005/graphql' },
            { name: 'wishlist', url: 'http://localhost:3003/api/graphql' },
          ],
        }),
        experimental_didResolveQueryPlan: (options) => {
          if (options.requestContext.operationName !== 'IntrospectionQuery') {
            console.log(serializeQueryPlan(options.queryPlan));
          }
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
