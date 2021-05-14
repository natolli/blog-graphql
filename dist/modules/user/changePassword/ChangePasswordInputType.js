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
exports.ChangePasswordInput = void 0;
const type_graphql_1 = require("type-graphql");
const PasswordInput_1 = require("../../shared/PasswordInput");
let ChangePasswordInput = class ChangePasswordInput extends PasswordInput_1.PasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "token", void 0);
ChangePasswordInput = __decorate([
    type_graphql_1.InputType()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;
//# sourceMappingURL=ChangePasswordInputType.js.map