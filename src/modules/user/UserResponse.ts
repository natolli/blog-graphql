import { Field, ObjectType } from "type-graphql";
import { User } from "../../entity/User";

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  error?: String;

  @Field(() => User, { nullable: true })
  user?: User;
}
