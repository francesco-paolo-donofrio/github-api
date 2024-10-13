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
document.addEventListener('DOMContentLoaded', function () {
    var searchBar = document.getElementById('search');
    var searchBtn = document.getElementById('searchBtn');
    var searchTypeDropdown = document.getElementById('searchType');
    var appDiv = document.getElementById('app');
    var cardTemplate = "\n        <div class=\"wrapper\">\n            <h1 class=\"card-title\"></h1>\n            <p class=\"card-description\"></p>\n            <a href=\"#\" target=\"_blank\" class=\"btn outline\">VIEW ON GITHUB</a>\n        </div>\n    ";
    searchBtn.addEventListener('click', function () {
        var searchQuery = searchBar.value.trim();
        var searchType = searchTypeDropdown.value;
        if (searchQuery) {
            fetchData(searchQuery, searchType);
        }
        else {
            appDiv.innerHTML = "<p>Please enter a search term.</p>";
        }
    });
    function fetchData(query, type) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        appDiv.innerHTML = "<p>Loading...</p>";
                        apiUrl = type === 'repositories'
                            ? "https://api.github.com/search/repositories?q=".concat(query, "&per_page=10")
                            : "https://api.github.com/search/users?q=".concat(query, "&per_page=10");
                        return [4, fetch(apiUrl)];
                    case 1:
                        response = _a.sent();
                        return [4, response.json()];
                    case 2:
                        data = _a.sent();
                        renderResults(data.items, type);
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching data:', error_1);
                        appDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    }
    function renderResults(results, type) {
        if (results.length === 0) {
            appDiv.innerHTML = "<p>No ".concat(type, " found.</p>");
            return;
        }
        appDiv.innerHTML = '';
        results.forEach(function (result) {
            var card = document.createElement('div');
            card.innerHTML = cardTemplate;
            if (type === 'repositories') {
                card.querySelector('.card-title').textContent = result.name;
                card.querySelector('.card-description').textContent = result.description || 'No description available.';
                card.querySelector('a').setAttribute('href', result.html_url);
            }
            else {
                card.querySelector('.card-title').textContent = result.login;
                card.querySelector('.card-description').textContent = "Type: ".concat(result.type);
                card.querySelector('a').setAttribute('href', result.html_url);
            }
            appDiv.appendChild(card);
        });
    }
});
//# sourceMappingURL=main.js.map