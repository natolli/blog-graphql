import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
