"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimDescription = void 0;
exports.trimDescription = (description) => {
    if (description.length <= 50) {
        return description;
    }
    const slicedString = description.slice(0, 50);
    return `${slicedString}...`;
};
//# sourceMappingURL=trimDescription.js.map