import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

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

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search') as HTMLInputElement;
    const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
    const searchTypeToggle = document.getElementById('searchType') as HTMLSelectElement;
    const appDiv = document.getElementById('app') as HTMLDivElement;

    async function fetchData(query: string) {
        const searchType = searchTypeToggle.value;
        console.log(`Fetching ${searchType} with query: ${query}`);

        // Mostra il loader
        appDiv.innerHTML = '<p>Loading...</p>';

        try {
            const response = await axios.get(`https://api.github.com/search/${searchType}?q=${query}&per_page=20`);
            const searchResults = response.data.items || [];

            // Chiaro il contenuto attuale delle card
            appDiv.innerHTML = '';

            if (searchResults.length === 0) {
                appDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            searchResults.forEach((item: Repository | User) => {
                let card: HTMLElement = document.getElementById('repoCardTemplate')!.cloneNode(true) as HTMLElement;

                if (searchType === 'repositories') {
                    card.querySelector('.repo-name')!.textContent = (item as Repository).name;
                    card.querySelector('.repo-description')!.textContent = (item as Repository).description || 'No description available.';
                    card.querySelector('.repo-stars')!.textContent = `Stars: ${(item as Repository).stargazers_count}`;
                    const link = card.querySelector('.repo-link') as HTMLAnchorElement;
                    link.href = (item as Repository).html_url;
                } else if (searchType === 'users') {
                    card.querySelector('.repo-name')!.textContent = (item as User).login;
                    card.querySelector('.repo-description')!.textContent = 'User/Organization';
                    card.querySelector('.repo-stars')!.textContent = '';
                    const link = card.querySelector('.repo-link') as HTMLAnchorElement;
                    link.href = (item as User).html_url;
                }

                card.classList.remove('d-none'); 
                appDiv.appendChild(card);
            });

        } catch (error) {
            console.error(`Error fetching ${searchType}:`, error);
            appDiv.innerHTML = '<p>An error occurred. Please try again.</p>';
        }
    }

    searchBtn.addEventListener('click', () => {
        const search = searchBar.value.trim().toLowerCase();
        console.log('Search button clicked. Search term:', search);
        
        if (search.length >= 3) {
            fetchData(search);
        } else {
            appDiv.innerHTML = "<p>Please enter at least 3 characters.</p>";
        }
    });
});