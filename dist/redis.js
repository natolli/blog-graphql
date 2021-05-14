"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    port: 10313,
    host: "redis-10313.c9.us-east-1-4.ec2.cloud.redislabs.com",
    password: "Gsmn1sGIVOlh16yrPtqUntF7FW0YJuqX",
});
//# sourceMappingURL=redis.js.map