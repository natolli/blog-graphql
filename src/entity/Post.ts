import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, OneToMany} from "typeorm";
import {User} from './User';
import { Comment } from  './Comment';

@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field(()=>String)
    @CreateDateColumn()
    createdAt: Date;
    
    @Field()
    @Column()
    userId: number;


    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(()=>Comment, comment=> comment.post)
    comments : Comment

}
