import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import { typeDefs, resolvers } from "./graphql";
import mongoose from './db/mongoose';
import { createPubSub } from './pubsub/redis';
import { DateTime } from './graphql/scalars/DateTime';

async function startServer() {
    const app = new Koa();

    // Connect to mongoDB
    await mongoose.connect();

    // Create ApolloServer
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            DateTime,
            ...resolvers
        },
        context: () => ({ pubsub: createPubSub() })
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log('Server running on http://localhost:4000/graphql');
    });
}

startServer().catch(err => {
    console.error('Error starting server:', err);
});