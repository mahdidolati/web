import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Book } from "./entities/Book";
import microConfig from "./mikro-orm.config";


const main = async () => {
    const orm = await MikroORM.init(microConfig); 
    // orm.getMigrator().up();
    const book = orm.em.create(Book, {title: "Book title"});
    await orm.em.persistAndFlush(book);
    console.log("hello");
}

main().catch((err) => {
    console.error(err);
});