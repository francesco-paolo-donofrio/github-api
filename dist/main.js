var _a;
import axios from 'axios';
let repositories = [];
axios.get('https://api.github.com/repositories')
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
    const repoNameDiv = document.getElementById('repo-name');
    if (search) {
        const filteredRepos = repositories.filter(repo => repo.name.toLowerCase().includes(search));
        console.log("Filtered repositories:", filteredRepos);
        const repoList = filteredRepos.map(repo => `<li>${repo.name}</li>`).join('');
        if (repoNameDiv) {
            repoNameDiv.innerHTML = `<ul>${repoList}</ul>`;
        }
    }
    else {
        console.log("Please enter a search term.");
    }
});
//# sourceMappingURL=main.js.map