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
exports.CommentssRsolver = void 0;
const type_graphql_1 = require("type-graphql");
const Comment_1 = require("../../entity/Comment");
const isAuth_1 = require("../middleware/isAuth");
const Post_1 = require("../../entity/Post");
const User_1 = require("../../entity/User");
let CommentssRsolver = class CommentssRsolver {
    getUserComments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            return yield Comment_1.Comment.find({ userId });
        });
    }
    getPostComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne({ id: postId });
            if (!post) {
                throw new Error('Post not found');
            }
            return yield Comment_1.Comment.find({ postId });
        });
    }
    user(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = User_1.User.findOne({ id: parent.userId });
            return user;
        });
    }
    post(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = Post_1.Post.findOne({ id: parent.postId });
            return post;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Comment_1.Comment]),
    __param(0, type_graphql_1.Arg('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentssRsolver.prototype, "getUserComments", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Comment_1.Comment]),
    __param(0, type_graphql_1.Arg('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentssRsolver.prototype, "getPostComments", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comment_1.Comment]),
    __metadata("design:returntype", Promise)
], CommentssRsolver.prototype, "user", null);
__decorate([
    type_graphql_1.FieldResolver(() => Post_1.Post),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comment_1.Comment]),
    __metadata("design:returntype", Promise)
], CommentssRsolver.prototype, "post", null);
CommentssRsolver = __decorate([
    type_graphql_1.Resolver(Comment_1.Comment)
], CommentssRsolver);
exports.CommentssRsolver = CommentssRsolver;
//# sourceMappingURL=Comments.js.map