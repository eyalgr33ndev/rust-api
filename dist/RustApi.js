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
exports.RustApi = exports.Server = void 0;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
class Server {
    constructor(id) {
        this.apiUrl = `https://rust-servers.net/server/${id}/`;
    }
    getPlayerCount() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            const pdata = ((_a = root.querySelector('td:contains("Players") + td')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
            return parseInt(pdata.split('/')[0].replace(/\s+/g, ''), 10);
        });
    }
    getMaxPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            const pdata = ((_a = root.querySelector('td:contains("Players") + td')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
            return parseInt(pdata.split('/')[1].replace(/\s+/g, ''), 10);
        });
    }
    getPlayersList() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            return ((_a = root.querySelector('.row:contains("Online Players") + .row div')) === null || _a === void 0 ? void 0 : _a.innerText.split('\n').filter(Boolean).map(n => ({ name: n.trim() }))) || [];
        });
    }
    getServerAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            return ((_a = root.querySelector('td:contains("Address") + td')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
        });
    }
    getServerName() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            return ((_a = root.querySelector('td:contains("Hostname") + td')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
        });
    }
    getServerStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            return ((_a = root.querySelector('td:contains("Status") + td button')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || 'Offline';
        });
    }
    GetTags() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            return ((_a = root.querySelector('td:contains("Tag(s)") + td')) === null || _a === void 0 ? void 0 : _a.childNodes.map(t => t.text.trim()).filter(Boolean)) || [];
        });
    }
    getServerMap() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            return ((_a = root.querySelector('td:contains("Map") + td')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
        });
    }
    getServerSpace() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(this.apiUrl);
            const root = (0, node_html_parser_1.parse)(response.data);
            const pdata = ((_a = root.querySelector('td:contains("Players") + td')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
            const [count, max] = pdata.split('/').map(n => parseInt(n.replace(/\s+/g, ''), 10));
            return (count / max) * 100;
        });
    }
}
exports.Server = Server;
class RustApi {
    static newServer(id) {
        return new Server(id);
    }
}
exports.RustApi = RustApi;
