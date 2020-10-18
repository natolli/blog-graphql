import {  Resolver,Mutation,Arg, UseMiddleware, Ctx, Int } from "type-graphql";
import { Post } from '../../entity/Post';
import { isAuth } from  '../middleware/isAuth';
import { MyContext } from  '../../types/MyContext';

@Resolver()
export class DeletePostRsolver{

    
    @UseMiddleware(isAuth)
    @Mutation(()=>Boolean)
    async deletePost(
        @Arg('id', ()=>Int) id:number,
        @Ctx() ctx: MyContext
    ): Promise<Boolean>{

        const post = await Post.findOne(id)
        
        if(!post){
            return false
        }
        
        if(post.userId !== ctx.req.session!.userId){
            throw new Error('Not Authorized')
        }

        await Post.delete({id})

        return true
        
       
    }


}