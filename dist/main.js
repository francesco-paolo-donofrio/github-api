"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let repositories = [];
axios_1.default.get('https://api.github.com/repositories')
    .then((response) => {
    repositories = response.data;
    console.log("Fetched repositories:", repositories);
})
    .catch((error) => {
    console.error("Error fetching repositories:", error);
});
(_a = document.getElementById('searchBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const searchBar = document.getElementById('search');
    const search = searchBar.value.toLowerCase();
    if (search) {
        const filteredRepos = repositories.filter(repo => repo.name.toLowerCase().includes(search));
        console.log("Filtered repositories:", filteredRepos);
    }
    else {
        console.log("Please enter a search term.");
    }
});
//# sourceMappingURL=main.js.map