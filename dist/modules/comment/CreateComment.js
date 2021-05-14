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
exports.CreateCommentRsolver = void 0;
const type_graphql_1 = require("type-graphql");
const Comment_1 = require("../../entity/Comment");
const isAuth_1 = require("../middleware/isAuth");
const Post_1 = require("../../entity/Post");
let CreateCommentRsolver = class CreateCommentRsolver {
    createComment(title, postId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne({ id: postId });
            if (!post) {
                throw new Error('Post Not Found');
            }
            const comment = yield Comment_1.Comment.create({
                postId,
                userId: ctx.req.session.userId,
                title
            }).save();
            return comment;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Comment_1.Comment),
    __param(0, type_graphql_1.Arg('title')),
    __param(1, type_graphql_1.Arg('postId')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], CreateCommentRsolver.prototype, "createComment", null);
CreateCommentRsolver = __decorate([
    type_graphql_1.Resolver()
], CreateCommentRsolver);
exports.CreateCommentRsolver = CreateCommentRsolver;
//# sourceMappingURL=CreateComment.js.map