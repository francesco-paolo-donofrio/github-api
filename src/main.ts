import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.html';

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
    const cardTemplate = document.getElementById('cardTemplate') as HTMLDivElement;

    if (!appDiv || !cardTemplate) {
        console.error("Required elements not found!");
        return;
    }

    let searchResults: SearchResult = [];
    let isLoading = false;
    let hasError = false;
    let searchType: 'repositories' | 'users' = 'repositories';

    async function fetchData(query: string) {
        console.log(`Fetching ${searchType} with query: ${query}`);
        isLoading = true;
        updateUI(); // Aggiorna l'interfaccia per mostrare il caricamento
    
        try {
            const response = await axios.get(`https://api.github.com/search/${searchType}?q=${query}&per_page=10`);
            console.log('API response:', response.data);
            searchResults = response.data.items;
            hasError = false;
        } catch (error) {
            console.error(`Error fetching ${searchType}:`, error);
            hasError = true;
            searchResults = [];
        }
    
        isLoading = false;
        updateUI();
    }

    function updateUI() {
        appDiv.innerHTML = ''; // Svuota il contenitore delle card

        if (isLoading) {
            appDiv.innerHTML = "<p>Loading...</p>";
            return;
        }

        if (hasError) {
            appDiv.innerHTML = `<p>An error occurred while fetching ${searchType}.</p>`;
            return;
        }

        if (searchResults.length === 0) {
            appDiv.innerHTML = `<p>No ${searchType} found.</p>`;
            return;
        }

        // Ciclo sui risultati della ricerca
        searchResults.forEach(item => {
            console.log('Cloning card for item:', item); // Log per verificare la clonazione

            const clonedCard = cardTemplate.cloneNode(true) as HTMLDivElement;
            clonedCard.style.display = 'block'; // Rimuove il "display: none"

            if (searchType === 'repositories') {
                const repo = item as Repository;
                clonedCard.querySelector('.card-title')!.textContent = repo.name;
                clonedCard.querySelector('.card-description')!.textContent = repo.description || 'No description available.';
                clonedCard.querySelector('.card-stars')!.textContent = `Stars: ${repo.stargazers_count}`;
                clonedCard.querySelector('a')!.setAttribute('href', repo.html_url);
            } else {
                const user = item as User;
                clonedCard.querySelector('.card-title')!.textContent = user.login;
                clonedCard.querySelector('.card-description')!.textContent = `Type: ${user.type}`;
                clonedCard.querySelector('a')!.setAttribute('href', user.html_url);
                (clonedCard.querySelector('.banner-image') as HTMLDivElement).style.backgroundImage = `url(${user.avatar_url})`;
            }

            // Aggiungi la card clonata al contenitore
            appDiv.appendChild(clonedCard);
        });
    }

    searchBtn.addEventListener('click', () => {
        const search: string = searchBar.value.trim().toLowerCase();
        if (search) {
            fetchData(search);
        } else {
            appDiv.innerHTML = "<p>Please enter a search term.</p>";
        }
    });

    searchTypeToggle.addEventListener('change', (event) => {
        searchType = (event.target as HTMLSelectElement).value as 'repositories' | 'users';
    });

    // Inizializzazione UI
    updateUI();
});




