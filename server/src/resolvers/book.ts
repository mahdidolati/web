import { Book } from "../entities/Book";
import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class BookResolver {
    @Query(() => [Book]) 
    books(
        @Ctx() {em}: MyContext
    ): Promise<Book[]>{
        return em.find(Book, {});
    }
}