import { MikroORM } from "@mikro-orm/core";
import { __db_name__, __db_password__, __db_user__, __prod__ } from "./constants";
import { Book } from "./entities/Book";
import { User } from "./entities/User";
import path from "path";

console.log("db name: ", __db_name__);
export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Book, User],
    dbName: __db_name__,
    user: __db_user__,
    password: __db_password__,
    debug: !__prod__,
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];