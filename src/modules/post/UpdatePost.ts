import {  Resolver,Mutation,Arg, UseMiddleware, Ctx, Int } from "type-graphql";
import { Post } from '../../entity/Post';
import { isAuth } from  '../middleware/isAuth';
import { MyContext } from  '../../types/MyContext';
import { UpdatePostInput } from  './updatePost/UpdatePostInput';
import { getConnection } from "typeorm";

@Resolver()
export class UpdatePostRsolver{

    
    @UseMiddleware(isAuth)
    @Mutation(()=>Post)
    async updatePost(
        @Arg('id', ()=>Int) id: number,
        @Arg('input') input:UpdatePostInput,
        @Ctx() ctx: MyContext
    ): Promise<Post | null>{

        const post = await getConnection()
            .createQueryBuilder()
            .update(Post)
            .set({...input})
            .where('id = :id and "userId" = :userId',
            {
                id, 
                userId: ctx.req.session!.userId
            }).returning('*')
            .execute();

        
        return post.raw[0]
       
    }


}