import {
  Arg,
  Mutation,
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationURL";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../middleware/isAuth";
import { UserResponse } from "./UserResponse";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello(@Ctx() ctx: MyContext): Promise<string> {
    const user = await User.findOne(ctx.req.session!.userId);

    return `Hello, ${user!.firstName}`;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<UserResponse> {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      return {
        error: "Please enter all fields",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const emailIsAlreadyTaken = await User.findOne({ where: { email } });

    if (emailIsAlreadyTaken) {
      return {
        error: "Email is already taken",
      };
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));

    return { user };
  }
}
