"use strict";
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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(email, url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.GMAIL_USERNAME);
        console.log(process.env.GMAIL_PASSWORD);
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        let mailOptions = {
            from: '"DEEP " <natolilemma1@example.com>',
            to: email,
            subject: "Confirm email or change password (DEEP)",
            text: "Hello, ",
            html: `<a href="${url}">${url}</a>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
        });
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map