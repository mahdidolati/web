import { Book } from "../entities/Book";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

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
        @Ctx() { em }: MyContext
    ): Promise<Book | null>{
        return em.findOne(Book, { id });
    }

    @Mutation(() => Book) 
    async createBook(
        @Arg('title', () => String) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Book>{
        const book = em.create(Book, { title });
        await em.persistAndFlush(book);
        return book;
    }

    @Mutation(() => Book, {nullable: true}) 
    async updateBook(
        @Arg('id', () => Int) id: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Book | null>{
        const book = await em.findOne(Book, {id});
        if(!book) {
            return null;
        }
        if(typeof title != "undefined") {
            book.title = title;
            await em.persistAndFlush(book);
        }
        return book;
    }

    @Mutation(() => Boolean) 
    async deleteBook(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean>{
        em.nativeDelete(Book, { id });
        return true;
    }
}