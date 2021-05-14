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
exports.DeletePostRsolver = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../../entity/Post");
const isAuth_1 = require("../middleware/isAuth");
const Comment_1 = require("../../entity/Comment");
const Upvote_1 = require("../../entity/Upvote");
const cloudnary_1 = require("../utils/cloudnary");
let DeletePostRsolver = class DeletePostRsolver {
    deletePost(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne(id);
            if (!post) {
                return false;
            }
            if (post.userId !== ctx.req.session.userId) {
                throw new Error("Not Authorized");
            }
            yield Upvote_1.Upvote.delete({ postId: id });
            yield Comment_1.Comment.delete({ postId: id });
            yield cloudnary_1.cloudinary.v2.uploader.destroy(post.imageName);
            yield Post_1.Post.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DeletePostRsolver.prototype, "deletePost", null);
DeletePostRsolver = __decorate([
    type_graphql_1.Resolver()
], DeletePostRsolver);
exports.DeletePostRsolver = DeletePostRsolver;
//# sourceMappingURL=DeletePost.js.map