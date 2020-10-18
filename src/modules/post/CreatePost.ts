import {  Resolver,Mutation,Arg, UseMiddleware, Ctx } from "type-graphql";
import { Post } from '../../entity/Post';
import { isAuth } from  '../middleware/isAuth';
import { CreatePostInput } from  './createPost/CreatePostInput';
import { MyContext } from  '../../types/MyContext';

@Resolver()
export class CreatePostRsolver{

    
    @UseMiddleware(isAuth)
    @Mutation(()=>Post)
    async createPost(
        @Arg('input') {title,description}:CreatePostInput,
        @Ctx() ctx: MyContext
    ): Promise<Post>{

        const post = await Post.create({
            title, description, userId:ctx.req.session!.userId
        }).save()

        return post
       
    }


}