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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entity/User");
const RegisterInput_1 = require("./register/RegisterInput");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendEmail_1 = require("../utils/sendEmail");
const createConfirmationURL_1 = require("../utils/createConfirmationURL");
const isAuth_1 = require("../middleware/isAuth");
const UserResponse_1 = require("./UserResponse");
let RegisterResolver = class RegisterResolver {
    hello(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(ctx.req.session.userId);
            return `Hello, ${user.firstName}`;
        });
    }
    register({ firstName, lastName, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email === "" ||
                password === "" ||
                firstName === "" ||
                lastName === "") {
                return {
                    error: "Please enter all fields",
                };
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const emailIsAlreadyTaken = yield User_1.User.findOne({ where: { email } });
            if (emailIsAlreadyTaken) {
                return {
                    error: "Email is already taken",
                };
            }
            const user = yield User_1.User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }).save();
            yield sendEmail_1.sendEmail(email, yield createConfirmationURL_1.createConfirmationUrl(user.id));
            return { user };
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse_1.UserResponse),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "register", null);
RegisterResolver = __decorate([
    type_graphql_1.Resolver()
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
//# sourceMappingURL=Register.js.map