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
exports.UpvoteRsolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const Upvote_1 = require("../../entity/Upvote");
const typeorm_1 = require("typeorm");
let UpvoteRsolver = class UpvoteRsolver {
    vote(postId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.session.userId;
            const isUpvote = value !== -1;
            const realValue = isUpvote ? 1 : -1;
            const upvote = yield Upvote_1.Upvote.findOne({ postId, userId });
            if (upvote && upvote.value !== realValue) {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
          update upvote 
          set value = $1
          where "postId" = $2 and "userId" = $3
          `, [realValue, postId, userId]);
                    yield tm.query(`
          update post 
          set points =points + $1
          where id = $2
          `, [2 * realValue, postId]);
                }));
            }
            else if (!upvote) {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
            insert into upvote ("userId","postId","value")
            values ($1, $2, $3)
          `, [userId, postId, realValue]);
                    yield tm.query(`
            update post
            set points = points + $1
            where id = $2
          `, [realValue, postId]);
                }));
            }
            else if (upvote && upvote.value === realValue) {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
          delete from upvote 
          where "postId" = $1 and "userId" = $2
          `, [postId, userId]);
                    yield tm.query(`
          update post 
          set points =points - $1
          where id = $2
          `, [realValue, postId]);
                }));
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("postId")),
    __param(1, type_graphql_1.Arg("value")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], UpvoteRsolver.prototype, "vote", null);
UpvoteRsolver = __decorate([
    type_graphql_1.Resolver()
], UpvoteRsolver);
exports.UpvoteRsolver = UpvoteRsolver;
//# sourceMappingURL=Upvote.js.map