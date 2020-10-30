import {  Resolver, UseMiddleware, Query, Arg, Int, FieldResolver, Root } from "type-graphql";
import { Post } from '../../entity/Post';
import { isAuth } from  '../middleware/isAuth';
import { User } from '../../entity/User';
import { Comment } from '../../entity/Comment';

@Resolver(Post)
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

    @FieldResolver(()=>User)
    async user(@Root() parent:Post): Promise<User>{
        const user =  await User.findOne({id: parent.userId})
        if(!user){
            throw new Error('User not found')
        }
        return user   
    }

    @FieldResolver(()=>[Comment])
    async comments(
        @Root() parent:Post
    ){
        const comments = await Comment.find({postId: parent.id})
    
        return comments
    }

}