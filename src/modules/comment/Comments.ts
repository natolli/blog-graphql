import {  Resolver, UseMiddleware, Query, Arg } from "type-graphql";
import { Comment } from  '../../entity/Comment';
import { isAuth } from  '../middleware/isAuth';
import {Post} from '../../entity/Post'
import {User} from '../../entity/User'

@Resolver()
export class CommentssRsolver{

    
    @UseMiddleware(isAuth)
    @Query(() => [Comment])
    async getUserComments(
        @Arg('userId') userId:number
    ): Promise<Comment[]>{

        const user = await User.findOne({id:userId})

        if(!user){
            throw new Error('User not found')
        }

        return await Comment.find({userId})
        
    }

    @UseMiddleware(isAuth)
    @Query(() => [Comment])
    async getPostComments(
        @Arg('postId') postId:number
    ): Promise<Comment[]>{

        const post = await Post.findOne({id:postId})

        if(!post){
            throw new Error('Post not found')
        }

        return await Comment.find({postId})
    }

}