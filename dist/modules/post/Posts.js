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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRsolver = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../../entity/Post");
const isAuth_1 = require("../middleware/isAuth");
const User_1 = require("../../entity/User");
const Comment_1 = require("../../entity/Comment");
const TopicEnum_1 = require("./topic/TopicEnum");
const trimDescription_1 = require("./posts/trimDescription");
const PaginatedPosts_1 = require("./posts/PaginatedPosts");
const typeorm_1 = require("typeorm");
const cloudnary_1 = require("../utils/cloudnary");
let PostsRsolver = class PostsRsolver {
    textSnippet(post) {
        return trimDescription_1.trimDescription(post.description);
    }
    posts(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const reaLimitPlusOne = realLimit + 1;
            const qb = typeorm_1.getConnection()
                .getRepository(Post_1.Post)
                .createQueryBuilder("p")
                .orderBy('p."createdAt"', "DESC")
                .take(reaLimitPlusOne);
            if (cursor) {
                qb.where('p."createdAt" < :cursor', {
                    cursor: new Date(parseInt(cursor)),
                });
            }
            const posts = yield qb.getMany();
            console.log("posts: ", posts);
            return {
                posts: posts.slice(0, realLimit),
                hasMore: posts.length === reaLimitPlusOne,
            };
        });
    }
    getUserPosts(id, limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const reaLimitPlusOne = realLimit + 1;
            const qb = typeorm_1.getConnection()
                .getRepository(Post_1.Post)
                .createQueryBuilder("p")
                .where('p."userId" = :userId', { userId: id })
                .orderBy('p."createdAt"', "DESC")
                .take(reaLimitPlusOne);
            if (cursor) {
                qb.where('p."createdAt" < :cursor', {
                    cursor: new Date(parseInt(cursor)),
                });
            }
            const posts = yield qb.getMany();
            console.log("posts: ", posts);
            return {
                posts: posts.slice(0, realLimit),
                hasMore: posts.length === reaLimitPlusOne,
            };
        });
    }
    getTopicPosts(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.Post.find();
            const filtredPosts = posts.filter((post) => {
                return post.topics.includes(topic);
            });
            return filtredPosts;
        });
    }
    getSinglePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne({ where: { id: postId } });
            return post;
        });
    }
    user(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ id: parent.userId });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    image(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            return cloudnary_1.cloudinary.v2.image(parent.imageName);
        });
    }
    comments(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield Comment_1.Comment.find({ postId: parent.id });
            return comments;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", void 0)
], PostsRsolver.prototype, "textSnippet", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => PaginatedPosts_1.PaginatedPosts),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "posts", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => PaginatedPosts_1.PaginatedPosts),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "getUserPosts", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Post_1.Post]),
    __param(0, type_graphql_1.Arg("topic", () => TopicEnum_1.Topic)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "getTopicPosts", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => Post_1.Post),
    __param(0, type_graphql_1.Arg("postId", () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "getSinglePost", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "user", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "image", null);
__decorate([
    type_graphql_1.FieldResolver(() => [Comment_1.Comment]),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", Promise)
], PostsRsolver.prototype, "comments", null);
PostsRsolver = __decorate([
    type_graphql_1.Resolver(Post_1.Post)
], PostsRsolver);
exports.PostsRsolver = PostsRsolver;
//# sourceMappingURL=Posts.js.map