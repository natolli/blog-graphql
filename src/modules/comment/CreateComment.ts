import {  Resolver,Mutation,Arg, UseMiddleware, Ctx } from "type-graphql";
import { Comment } from  '../../entity/Comment';
import { isAuth } from  '../middleware/isAuth';
import { MyContext } from  '../../types/MyContext';
import { Post } from '../../entity/Post';

@Resolver()
export class CreateCommentRsolver{

    
    @UseMiddleware(isAuth)
    @Mutation(()=>Comment)
    async createComment(
        @Arg('title') title:string,
        @Arg('postId') postId:number,
        @Ctx() ctx: MyContext
    ): Promise<Comment>{

        const post = await Post.findOne({id: postId})

        if(!post){
            throw new Error('Post Not Found')
        }

        const comment = await Comment.create({
             postId, userId:ctx.req.session!.userId, title
        }).save()
       
        return comment
    }


}