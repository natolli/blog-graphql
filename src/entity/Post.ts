import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ type: "int", default: 0 })
  points: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment;

  @Field(() => [Upvote])
  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];
}
