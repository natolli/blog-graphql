import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Post } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { CreatePostInput } from "./createPost/CreatePostInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class CreatePostRsolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPost(
    @Arg("input") { title, description, topics }: CreatePostInput,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    if (topics.length > 3) {
      throw new Error("Maxmium of 3 topics is allowed");
    }

    const post = await Post.create({
      title,
      description,
      topics,
      userId: ctx.req.session!.userId,
    }).save();

    return post;
  }
}
