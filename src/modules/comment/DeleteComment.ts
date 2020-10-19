import {  Resolver,Mutation,Arg, UseMiddleware, Ctx, Int } from "type-graphql";
import { isAuth } from  '../middleware/isAuth';
import { MyContext } from  '../../types/MyContext';
import { Comment } from  '../../entity/Comment';

@Resolver()
export class DeleteCommentRsolver{

    
    @UseMiddleware(isAuth)
    @Mutation(()=>Boolean)
    async deletePost(
        @Arg('id', ()=>Int) id:number,
        @Ctx() ctx: MyContext
    ): Promise<Boolean>{

        const comment = await Comment.findOne(id)
        
        if(!comment){
            return false
        }
        
        if(comment.userId !== ctx.req.session!.userId){
            throw new Error('Not Authorized')
        }

        await Comment.delete({id})

        return true
        
       
    }


}