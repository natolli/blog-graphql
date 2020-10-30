import { MyContext } from "../../types/MyContext";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { User } from "../../entity/User";
import { Post } from "../../entity/Post";

@Resolver(User)
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }

  @FieldResolver(() => [Post])
  async posts(@Root() parent: User) {
    const posts = Post.find({ userId: parent.id });

    return posts;
  }
}
