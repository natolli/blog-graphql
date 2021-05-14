"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const type_graphql_1 = require("type-graphql");
var Topic;
(function (Topic) {
    Topic["Science"] = "Science";
    Topic["Art"] = "Art";
    Topic["Music"] = "Music";
    Topic["Gaming"] = "Gaming";
    Topic["Humor"] = "Humor";
    Topic["Culture"] = "Culture";
    Topic["Food"] = "Food";
    Topic["Pets"] = "Pets";
    Topic["Sport"] = "Sport";
})(Topic = exports.Topic || (exports.Topic = {}));
type_graphql_1.registerEnumType(Topic, {
    name: "Topic",
    description: "The types of topics.",
});
//# sourceMappingURL=TopicEnum.js.map