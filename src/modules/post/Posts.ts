import {  Resolver, UseMiddleware, Query, Arg, Int } from "type-graphql";
import { Post } from '../../entity/Post';
import { isAuth } from  '../middleware/isAuth';

@Resolver()
export class PostsRsolver{

    
    @UseMiddleware(isAuth)
    @Query(() => [Post])
    async posts(
        @Arg('id',()=>Int, {nullable:true}) id:number
    ): Promise<Post[]>{

        if(id){
            return await Post.find({userId:id})
        }

        const posts = await Post.find();
    
        return posts
    }


}