import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn} from "typeorm";
import {User} from './User';
import { Post } from './Post';


@ObjectType()
@Entity()
export class Comment extends BaseEntity {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(()=>String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    postId: number;

    @Field(()=>User)
    @ManyToOne(() => User, user => user.posts)
    user: User;

    @Field(()=>Post)
    @ManyToOne(() => Post, post => post.comments)
    post: Post;

}
