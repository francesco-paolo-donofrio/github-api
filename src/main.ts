import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
}

interface User {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
}

type SearchResult = Repository[] | User[];

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search') as HTMLInputElement;
    const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
    const searchTypeToggle = document.getElementById('searchType') as HTMLSelectElement;
    const appDiv = document.getElementById('app') as HTMLDivElement;

    let searchResults: SearchResult = [];
    let searchType: 'repositories' | 'users' = 'repositories';

    async function fetchData(query: string) {
        console.log(`Fetching ${searchType} with query: ${query}`);

        try {
            const response = await axios.get(`https://api.github.com/search/${searchType}?q=${query}&per_page=10`);
            console.log('API response:', response.data);

            // Assicurati di ottenere items dalla risposta
            searchResults = response.data.items || [];
            console.log('Search results:', searchResults);
        } catch (error) {
            console.error(`Error fetching ${searchType}:`, error);
            searchResults = [];
        }

        // Aggiorna l'UI dopo la fetch
        updateUI();
    }

    function updateUI() {
        console.log('Updating UI. Search results:', searchResults);
        let htmlContent = '';

        if (searchResults.length > 0) {
            htmlContent = searchResults.map(item => 
                searchType === 'repositories' 
                    ? createRepoCard(item as Repository) 
                    : createUserCard(item as User)
            ).join('');
        } else {
            htmlContent = `<p>No ${searchType} found.</p>`;
        }

        appDiv.innerHTML = htmlContent;
        console.log('Updated appDiv:', appDiv.innerHTML); // Verifica il contenuto di appDiv
    }

    function createRepoCard(repo: Repository): string {
        return `
            <div class="wrapper">
                <h1>${repo.name}</h1>
                <p>${repo.description || 'No description available.'}</p>
                <p>Stars: ${repo.stargazers_count}</p>
                <div class="button-wrapper">
                    <a href="${repo.html_url}" target="_blank" class="btn outline">VIEW ON GITHUB</a>
                </div>
            </div>
        `;
    }

    function createUserCard(user: User): string {
        return `
            <div class="wrapper">
                <img src="${user.avatar_url}" alt="${user.login}" class="avatar-image">
                <h1>${user.login}</h1>
                <p>Type: ${user.type}</p>
                <div class="button-wrapper">
                    <a href="${user.html_url}" target="_blank" class="btn outline">VIEW ON GITHUB</a>
                </div>
            </div>
        `;
    }

    searchBtn.addEventListener('click', () => {
        const search = searchBar.value.trim().toLowerCase();
        console.log('Search button clicked. Search term:', search);
        if (search) {
            fetchData(search);
        } else {
            appDiv.innerHTML = "<p>Please enter a search term.</p>";
        }
    });

    searchTypeToggle.addEventListener('change', (event) => {
        searchType = (event.target as HTMLSelectElement).value as 'repositories' | 'users';
        console.log('Search type changed to:', searchType);
    });

    // Inizializzazione
    updateUI();
});