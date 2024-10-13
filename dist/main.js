var _a;
import axios from 'axios';
var repositories = [];
axios.get('https://api.github.com/repositories')
    .then(function (response) {
    repositories = response.data;
    console.log("Fetched repositories:", repositories);
})
    .catch(function (error) {
    console.error("Error fetching repositories:", error);
});
(_a = document.getElementById('searchBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var searchBar = document.getElementById('search');
    var search = searchBar.value.toLowerCase();
    var repoNameDiv = document.getElementById('repo-name');
    if (search) {
        var filteredRepos = repositories.filter(function (repo) {
            return repo.name.toLowerCase().includes(search);
        });
        console.log("Filtered repositories:", filteredRepos);
        var repoList = filteredRepos.map(function (repo) { return "".concat(repo.name); }).join('');
        if (repoNameDiv) {
            repoNameDiv.innerHTML = "".concat(repoList);
        }
    }
    else {
        console.log("Please enter a search term.");
    }
});
//# sourceMappingURL=main.js.map