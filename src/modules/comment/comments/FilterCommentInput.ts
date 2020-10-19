import { Field, InputType, Int } from "type-graphql";

@InputType()
export class FilterCommentInput{
    
    @Field(()=>Int, {nullable: true})
    userId: number
    
    @Field(()=>Int, {nullable: true})
    postId: number
    
}