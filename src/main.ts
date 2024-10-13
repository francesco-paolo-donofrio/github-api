import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
}

let repositories: Repository[] = [];
let isLoading = false;
let hasError = false;

const searchBar = document.getElementById('search') as HTMLInputElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const appDiv = document.getElementById('app') as HTMLDivElement;

async function fetchRepositories(query: string) {
    isLoading = true;
    updateUI();

    try {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}&per_page=10`);
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

function updateUI() {
    if (isLoading) {
        appDiv.innerHTML = "<p>Loading...</p>";
    } else if (hasError) {
        appDiv.innerHTML = "<p>An error occurred while fetching repositories.</p>";
    } else if (repositories.length > 0) {
        appDiv.innerHTML = repositories.map(repo => createRepoCard(repo)).join('');
    } else {
        appDiv.innerHTML = "<p>No repositories found.</p>";
    }
}

function createRepoCard(repo: Repository): string {
    return `
        <div class="wrapper">
            <div class="banner-image"></div>
            <h1>${repo.name}</h1>
            <p>${repo.description || 'No description available.'}</p>
            <p>Stars: ${repo.stargazers_count}</p>
            <div class="button-wrapper">
                <a href="${repo.html_url}" target="_blank" class="btn outline">VIEW ON GITHUB</a>
            </div>
        </div>
    `;
}

searchBtn.addEventListener('click', () => {
    const search: string = searchBar.value.trim().toLowerCase();
    if (search) {
        fetchRepositories(search);
    } else {
        appDiv.innerHTML = "<p>Please enter a search term.</p>";
    }
});

updateUI();

const dropdownButton = document.getElementById('dropdown');

if (dropdownButton) {
  dropdownButton.addEventListener('click', () => {
    console.log('Dropdown button clicked!');
  });
}




