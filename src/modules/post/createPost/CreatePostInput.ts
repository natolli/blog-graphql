import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Topic } from "../topic/TopicEnum";

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 50)
  title: string;

  @Field()
  description: string;

  @Field(() => [Topic])
  topics: string[];
}
