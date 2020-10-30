import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment;

  @Field(() => [Upvote])
  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];
}
