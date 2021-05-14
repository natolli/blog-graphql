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
exports.CreatePostRsolver = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../../entity/Post");
const isAuth_1 = require("../middleware/isAuth");
const CreatePostInput_1 = require("./createPost/CreatePostInput");
const graphql_upload_1 = require("graphql-upload");
const cloudnary_1 = require("../utils/cloudnary");
let CreatePostRsolver = class CreatePostRsolver {
    createPost({ title, description, topics }, { file, filename }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (topics.length > 3) {
                throw new Error("Maxmium of 3 topics is allowed");
            }
            const croppedFileName = filename.split(".").slice(0, -1).join(".");
            yield cloudnary_1.cloudinary.v2.uploader.upload_large(file, { public_id: croppedFileName, timeout: 600000 }, (err, result) => {
                if (err) {
                    throw new Error(err.message);
                }
                console.log(result);
            });
            const post = yield Post_1.Post.create({
                title,
                description,
                topics,
                userId: ctx.req.session.userId,
                imageName: croppedFileName,
            }).save();
            return post;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Arg("picture", () => graphql_upload_1.GraphQLUpload)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostInput_1.CreatePostInput, Object, Object]),
    __metadata("design:returntype", Promise)
], CreatePostRsolver.prototype, "createPost", null);
CreatePostRsolver = __decorate([
    type_graphql_1.Resolver()
], CreatePostRsolver);
exports.CreatePostRsolver = CreatePostRsolver;
//# sourceMappingURL=CreatePost.js.map