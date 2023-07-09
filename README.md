# a monorepo for federated graphQL services 
this project have 3 nestjs services. `Auth` service have a `Person` module with a `User` object type.
`Api` service have a `Post` object type. there is one-to-many/many-to-one relation between `User` and `Post`.
and `graph` service is `apollo federation gateway`.

## install dependencies
```
$$ npm install
```

## run project
```
$$ npm run auth:serve
```
```
$$ npm run api:serve
```
```
$$ npm run graph:serve
```

## graphQL playground
```
localhost:3002/graphql
```
