import axios from 'axios';

let repositories: any[] = [];
let isLoading = false;
let hasError = false;

const searchBar = document.getElementById('search') as HTMLInputElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const repoNameDiv = document.getElementById('repo-name') as HTMLDivElement;

// Function to fetch repositories
async function fetchRepositories(query: string) {
    isLoading = true;
    updateUI();

    try {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
        repositories = response.data.items;
        hasError = false;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        hasError = true;
        repositories = [];
    }

    isLoading = false;
    updateUI();
}

// Function to update UI
function updateUI() {
    if (isLoading) {
        repoNameDiv.innerHTML = "<p>Loading...</p>";
    } else if (hasError) {
        repoNameDiv.innerHTML = "<p>An error occurred while fetching repositories.</p>";
    } else if (repositories.length > 0) {
        const repoList = repositories.map(repo => `<li>${repo.name}</li>`).join('');
        repoNameDiv.innerHTML = `<ul>${repoList}</ul>`;
    } else {
        repoNameDiv.innerHTML = "<p>No repositories found.</p>";
    }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const search: string = searchBar.value.trim().toLowerCase();
    if (search) {
        fetchRepositories(search);
    } else {
        repoNameDiv.innerHTML = "<p>Please enter a search term.</p>";
    }
});

// Initial UI update
updateUI();




