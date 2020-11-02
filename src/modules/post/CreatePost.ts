import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Post } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { CreatePostInput } from "./createPost/CreatePostInput";
import { MyContext } from "../../types/MyContext";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { cloudinary } from "../utils/cloudnary";

@Resolver()
export class CreatePostRsolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPost(
    @Arg("input") { title, description, topics }: CreatePostInput,
    @Arg("picture", () => GraphQLUpload) { file, filename }: Upload,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    if (topics.length > 3) {
      throw new Error("Maxmium of 3 topics is allowed");
    }

    cloudinary.v2.uploader.upload(
      file,
      { public_id: filename },
      (err, result) => {
        if (err) {
          throw new Error("Image wasnt uploded: " + err);
        }
        console.log(result);
      }
    );

    const post = await Post.create({
      title,
      description,
      topics,
      userId: ctx.req.session!.userId,
      imageName: filename,
    }).save();

    return post;
  }
}
