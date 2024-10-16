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
import './css/style.css';
document.addEventListener('DOMContentLoaded', function () {
    var searchBar = document.getElementById('search');
    var searchBtn = document.getElementById('searchBtn');
    var searchTypeToggle = document.getElementById('searchType');
    var appDiv = document.getElementById('app');
    searchBtn.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var search, searchType, response, searchResults, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    search = searchBar.value.trim().toLowerCase();
                    searchType = searchTypeToggle.value;
                    console.log('Search button clicked. Search term:', search);
                    if (!(search.length >= 3)) return [3, 5];
                    appDiv.innerHTML = '<p>Loading...</p>';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, axios.get("https://api.github.com/search/".concat(searchType, "?q=").concat(search, "&per_page=20"))];
                case 2:
                    response = _a.sent();
                    searchResults = response.data.items || [];
                    console.log('Search results:', searchResults);
                    appDiv.innerHTML = '';
                    if (searchResults.length === 0) {
                        appDiv.innerHTML = '<p>No results found.</p>';
                        return [2];
                    }
                    searchResults.forEach(function (item, index) {
                        var card = document.getElementById('repoCardTemplate').cloneNode(true);
                        console.log("Rendering card #".concat(index, ":"), item);
                        if (searchType === 'repositories') {
                            card.querySelector('.repo-name').textContent = item.name;
                            card.querySelector('.repo-description').textContent = item.description || 'No description available.';
                            card.querySelector('.repo-stars').textContent = "Stars: ".concat(item.stargazers_count);
                            var link = card.querySelector('.repo-link');
                            link.href = item.html_url;
                        }
                        else if (searchType === 'users') {
                            card.querySelector('.repo-name').textContent = item.login;
                            card.querySelector('.repo-description').textContent = 'User/Organization';
                            var link = card.querySelector('.repo-link');
                            link.href = item.html_url;
                        }
                        card.classList.remove('d-none');
                        appDiv.appendChild(card);
                    });
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching ".concat(searchType, ":"), error_1);
                    appDiv.innerHTML = '<p>An error occurred. Please try again.</p>';
                    return [3, 4];
                case 4: return [3, 6];
                case 5:
                    appDiv.innerHTML = "<p>Please enter at least 3 characters.</p>";
                    _a.label = 6;
                case 6: return [2];
            }
        });
    }); });
});
//# sourceMappingURL=main.js.map