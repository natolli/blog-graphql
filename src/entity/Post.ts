import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn} from "typeorm";
import {User} from './User';


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

}
