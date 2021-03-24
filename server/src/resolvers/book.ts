import { Book } from "../entities/Book";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

@Resolver()
export class BookResolver {
    @Query(() => [Book]) 
    books(
        @Ctx() {em}: MyContext
    ): Promise<Book[]>{
        return em.find(Book, {});
    }

    @Query(() => Book, { nullable: true }) 
    book(
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Book | null>{
        return em.findOne(Book, { id });
    }
}