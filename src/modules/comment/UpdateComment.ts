import {  Resolver,Mutation,Arg, UseMiddleware, Ctx, Int } from "type-graphql";
import { Comment } from  '../../entity/Comment';
import { isAuth } from  '../middleware/isAuth';
import { MyContext } from  '../../types/MyContext';
import { getConnection } from "typeorm";

@Resolver()
export class UpdateCommentRsolver{

    
    @UseMiddleware(isAuth)
    @Mutation(()=>Comment)
    async updateComment(
        @Arg('id', ()=>Int) id: number,
        @Arg('title') title:string,
        @Ctx() ctx: MyContext
    ): Promise<Comment | null>{

        const comment = await getConnection()
            .createQueryBuilder()
            .update(Comment)
            .set({title})
            .where('id = :id and "userId" = :userId',
            {
                id, 
                userId: ctx.req.session!.userId
            }).returning('*')
            .execute();

        
        return comment.raw[0]
       
    }


}