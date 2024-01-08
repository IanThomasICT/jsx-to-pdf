"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const helpers_1 = require("./helpers");
function Codepen(userName, userId) {
    return ((0, jsx_runtime_1.jsxs)(helpers_1.Page, { children: [(0, jsx_runtime_1.jsxs)(helpers_1.Heading, { className: "text-2xl", children: ["I am a headline made with HTML for #", userId, ": ", (0, jsx_runtime_1.jsx)("strong", { children: userName })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-red-600", children: "And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript." }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "bg-blue-600 text-white italic px-6 py-2", children: "Hide the text above?" })] }));
}
exports.default = Codepen;
