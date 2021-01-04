import {
  Resolver,
  UseMiddleware,
  Query,
  Arg,
  Int,
  FieldResolver,
  Root,
} from "type-graphql";
import { Post } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { User } from "../../entity/User";
import { Comment } from "../../entity/Comment";
import { Topic } from "./topic/TopicEnum";
import { trimDescription } from "./posts/trimDescription";
import { PaginatedPosts } from "./posts/PaginatedPosts";
import { getConnection } from "typeorm";
import { cloudinary } from "../utils/cloudnary";

@Resolver(Post)
export class PostsRsolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return trimDescription(post.description);
  }

  @UseMiddleware(isAuth)
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('p."createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('p."createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const posts = await qb.getMany();
    console.log("posts: ", posts);

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === reaLimitPlusOne,
    };
  }

  @UseMiddleware(isAuth)
  @Query(() => PaginatedPosts)
  async getUserPosts(
    @Arg("id", () => Int) id: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ) {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .where('p."userId" = :userId', { userId: id })
      .orderBy('p."createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('p."createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const posts = await qb.getMany();
    console.log("posts: ", posts);

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === reaLimitPlusOne,
    };
  }

  @UseMiddleware(isAuth)
  @Query(() => [Post])
  async getTopicPosts(
    @Arg("topic", () => Topic) topic: string
  ): Promise<Post[]> {
    const posts = await Post.find();

    const filtredPosts = posts.filter((post) => {
      return post.topics.includes(topic);
    });

    return filtredPosts;
  }

  @UseMiddleware(isAuth)
  @Query(() => Post)
  async getSinglePost(
    @Arg("postId", () => Int, { nullable: true }) postId: number
  ): Promise<Post | undefined> {
    const post = await Post.findOne({ where: { id: postId } });

    return post;
  }

  @FieldResolver(() => User)
  async user(@Root() parent: Post): Promise<User> {
    const user = await User.findOne({ id: parent.userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  @FieldResolver(() => User)
  async image(@Root() parent: Post) {
    return cloudinary.v2.image(parent.imageName);
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() parent: Post) {
    const comments = await Comment.find({ postId: parent.id });

    return comments;
  }
}
