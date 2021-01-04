import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { LoginInput } from "./login/LoginInput";
import { MyContext } from "../../types/MyContext";
import { UserResponse } from "./UserResponse";

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg("input") { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse | null> {
    const user = await User.findOne({ where: { email } });

    if (email === "" && password === "") {
      return {
        error: "Please enter username and password",
      };
    }

    if (!user) {
      return {
        error: "email or password is not correct",
      };
    }

    const valid = await bcrypt.compare(password, user!.password);

    if (!valid) {
      return {
        error: "email or password is not correct",
      };
    }

    if (!user.confirmed) {
      return {
        error: "confirm user",
      };
    }

    ctx.req.session!.userId = user.id;

    return { user };
  }
}
