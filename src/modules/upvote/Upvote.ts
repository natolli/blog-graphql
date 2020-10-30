import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../../types/MyContext";
import { Upvote } from "../../entity/Upvote";
import { getConnection } from "typeorm";

@Resolver()
export class UpvoteRsolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async vote(
    @Arg("postId") postId: number,
    @Arg("value") value: number,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session!.userId;

    const isUpvote = value !== -1;

    const realValue = isUpvote ? 1 : -1;

    const upvote = await Upvote.findOne({ postId, userId });

    // User already voted and want to change
    if (upvote && upvote.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update upvote 
          set value = $1
          where "postId" = $2 and "userId" = $3
          `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post 
          set points =points + $1
          where id = $2
          `,
          [2 * realValue, postId]
        );
      });
    } else if (!upvote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
            insert into upvote ("userId","postId","value")
            values ($1, $2, $3)
          `,
          [userId, postId, realValue]
        );
        await tm.query(
          `
            update post
            set points = points + $1
            where id = $2
          `,
          [realValue, postId]
        );
      });
    } else if (upvote && upvote.value === realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          delete from upvote 
          where "postId" = $1 and "userId" = $2
          `,
          [postId, userId]
        );
        await tm.query(
          `
          update post 
          set points =points - $1
          where id = $2
          `,
          [realValue, postId]
        );
      });
    }

    return true;
  }
}
