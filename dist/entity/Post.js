"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
const Upvote_1 = require("./Upvote");
const TopicEnum_1 = require("../modules/post/topic/TopicEnum");
let Post = class Post extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(() => [TopicEnum_1.Topic]),
    typeorm_1.Column("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], Post.prototype, "topics", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "imageName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.posts),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Comment_1.Comment]),
    typeorm_1.OneToMany(() => Comment_1.Comment, (comment) => comment.post),
    __metadata("design:type", Comment_1.Comment)
], Post.prototype, "comments", void 0);
__decorate([
    type_graphql_1.Field(() => [Upvote_1.Upvote]),
    typeorm_1.OneToMany(() => Upvote_1.Upvote, (upvote) => upvote.user),
    __metadata("design:type", Array)
], Post.prototype, "upvotes", void 0);
Post = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map