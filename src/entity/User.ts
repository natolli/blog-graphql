import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Post} from './Post'


@ObjectType()
@Entity()
export class User extends BaseEntity{
    
    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column('text', {unique:true})
    email: string;

    @Column()
    password: string;

    @Column('bool', {default:false})
    confirmed: boolean

    @OneToMany(()=>Post, post=>post.user)
    posts: Post
}