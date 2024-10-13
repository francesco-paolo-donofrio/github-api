var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
var searchResults = [];
var isLoading = false;
var hasError = false;
var searchType = 'repositories';
var searchBar = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var searchTypeToggle = document.getElementById('searchType');
var appDiv = document.getElementById('app');
function fetchData(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isLoading = true;
                    updateUI();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, axios.get("https://api.github.com/search/".concat(searchType, "?q=").concat(query, "&per_page=10"))];
                case 2:
                    response = _a.sent();
                    searchResults = response.data.items;
                    hasError = false;
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching ".concat(searchType, ":"), error_1);
                    hasError = true;
                    searchResults = [];
                    return [3, 4];
                case 4:
                    isLoading = false;
                    updateUI();
                    return [2];
            }
        });
    });
}
function updateUI() {
    if (isLoading) {
        appDiv.innerHTML = "<p>Loading...</p>";
    }
    else if (hasError) {
        appDiv.innerHTML = "<p>An error occurred while fetching ".concat(searchType, ".</p>");
    }
    else if (searchResults.length > 0) {
        appDiv.innerHTML = searchResults.map(function (item) {
            return searchType === 'repositories'
                ? createRepoCard(item)
                : createUserCard(item);
        }).join('');
    }
    else {
        appDiv.innerHTML = "<p>No ".concat(searchType, " found.</p>");
    }
}
function createRepoCard(repo) {
    return "\n        <div class=\"wrapper\">\n            <div class=\"banner-image\"></div>\n            <h1>".concat(repo.name, "</h1>\n            <p>").concat(repo.description || 'No description available.', "</p>\n            <p>Stars: ").concat(repo.stargazers_count, "</p>\n            <div class=\"button-wrapper\">\n                <a href=\"").concat(repo.html_url, "\" target=\"_blank\" class=\"btn outline\">VIEW ON GITHUB</a>\n            </div>\n        </div>\n    ");
}
function createUserCard(user) {
    return "\n        <div class=\"wrapper\">\n            <img src=\"".concat(user.avatar_url, "\" alt=\"").concat(user.login, "\" class=\"avatar-image\">\n            <h1>").concat(user.login, "</h1>\n            <p>Type: ").concat(user.type, "</p>\n            <div class=\"button-wrapper\">\n                <a href=\"").concat(user.html_url, "\" target=\"_blank\" class=\"btn outline\">VIEW ON GITHUB</a>\n            </div>\n        </div>\n    ");
}
searchBtn.addEventListener('click', function () {
    var search = searchBar.value.trim().toLowerCase();
    if (search) {
        fetchData(search);
    }
    else {
        appDiv.innerHTML = "<p>Please enter a search term.</p>";
    }
});
searchTypeToggle.addEventListener('change', function (event) {
    searchType = event.target.value;
});
updateUI();
//# sourceMappingURL=main.js.map