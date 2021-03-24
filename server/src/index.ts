import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book";

const main = async () => {
    const orm = await MikroORM.init(microConfig); 
    // await orm.getMigrator().up();
    // const book = orm.em.create(Book, {title: "Book title"});
    // await orm.em.persistAndFlush(book);
    console.log("hello");

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [BookResolver],
            validate: false
        }),
        context: () => ({ em: orm.em }),
    });

    apolloServer.applyMiddleware({ app });

    // app.get("/", (_, res) => {
    //     res.send("hello");
    // });
    
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
}

main().catch((err) => {
    console.error(err);
});