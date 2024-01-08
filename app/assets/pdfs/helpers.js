"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinString = exports.Spacer = exports.Heading = exports.Page = exports.ElementWithTailwind = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ElementWithTailwind = (children) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("script", { src: "https://cdn.tailwindcss.com" }), children] }));
exports.ElementWithTailwind = ElementWithTailwind;
const Page = ({ children }) => (0, jsx_runtime_1.jsx)("div", { className: "mx-auto bg-white aspect-[8.5/11] h-screen space-y-2 border px-8 py-6 text-xs tracking-tight", children: children });
exports.Page = Page;
const Heading = ({ className, children }) => (0, jsx_runtime_1.jsx)("h2", { className: `${className} text-base`, children: children });
exports.Heading = Heading;
const Spacer = () => (0, jsx_runtime_1.jsx)("div", { className: "grow" });
exports.Spacer = Spacer;
// @ts-ignore
const joinString = (...strings) => strings.filter((s) => s).join(", ");
exports.joinString = joinString;
