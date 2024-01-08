"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./global.css");
const download_svg_1 = __importDefault(require("./assets/download.svg"));
client_1.default.createRoot(document.getElementById("root")).render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App, {}) }));
const BASE_URL = "http://localhost:3000";
function App() {
    const [users, setUsers] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const getUsers = async () => {
            return await fetch(`${BASE_URL}/api/users`).then((res) => res.json());
        };
        getUsers().then((u) => setUsers(u));
    }, []);
    async function downloadFile(fileName, fileId) {
        const filePDF = await fetch(`${BASE_URL}/api/download/${fileId}?name=${fileName}`, {});
        const pdfBlob = await filePDF.blob();
        saveFile(`${fileName}.pdf`, pdfBlob);
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col px-10 gap-6 h-screen justify-center items-center", children: users?.map((u) => {
            if (u) {
                return ((0, jsx_runtime_1.jsxs)("div", { id: String(u.id), className: "w-full px-4 border border-blue-800 rounded-md items-center py-6 flex justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { children: [u.id, " ", u.name] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "bg-blue-500 text-white min-h-12 px-4 py-2 rounded-md", onClick: () => downloadFile(u.name ?? "unknown", u.id), children: (0, jsx_runtime_1.jsx)("img", { src: download_svg_1.default, alt: "download icon", className: "invert w-5 h-5" }) })] }));
            }
        }) }));
}
function saveFile(fileName, fileBlob) {
    // const fileBlob = new Blob([fileBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(fileBlob);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = fileName;
    anchorElement.target = "_blank";
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
}
