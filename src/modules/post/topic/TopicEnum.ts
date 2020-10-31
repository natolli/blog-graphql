import { registerEnumType } from "type-graphql";

export enum Topic {
  Science = "Science",
  Art = "Art",
  Music = "Music",
  Gaming = "Gaming",
  Humor = "Humor",
  Culture = "Culture",
  Food = "Food",
  Pets = "Pets",
  Sport = "Sport",
}

registerEnumType(Topic, {
  name: "Topic",
  description: "The types of topics.",
});
