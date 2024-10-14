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

    // Funzione per rendere visibile il contenuto del DOM e fare la chiamata API
    searchBtn.addEventListener('click', async () => {
        const search = searchBar.value.trim().toLowerCase();
        const searchType = searchTypeToggle.value;

        console.log('Search button clicked. Search term:', search);

        // Controlla se la ricerca è abbastanza lunga
        if (search.length >= 3) {
            // Mostra il loader e cancella i risultati precedenti
            appDiv.innerHTML = '<p>Loading...</p>';

            try {
                // Esegui la chiamata API
                const response = await axios.get(`https://api.github.com/search/${searchType}?q=${search}&per_page=20`);
                const searchResults = response.data.items || [];
                console.log('Search results:', searchResults);

                // Svuota il contenuto del div prima di mostrare i risultati
                appDiv.innerHTML = '';

                // Se non ci sono risultati
                if (searchResults.length === 0) {
                    appDiv.innerHTML = '<p>No results found.</p>';
                    return;
                }

                // Cicla i risultati della ricerca e mostra le card
                searchResults.forEach((item: Repository | User, index : number) => {
                    // Clona il template della card
                    let card: HTMLElement = document.getElementById('repoCardTemplate')!.cloneNode(true) as HTMLElement;
                    console.log(`Rendering card #${index}:`, item);

                    // Aggiungi le informazioni corrette alla card
                    if (searchType === 'repositories') {
                        card.querySelector('.repo-name')!.textContent = (item as Repository).name;
                        card.querySelector('.repo-description')!.textContent = (item as Repository).description || 'No description available.';
                        card.querySelector('.repo-stars')!.textContent = `Stars: ${(item as Repository).stargazers_count}`;
                        const link = card.querySelector('.repo-link') as HTMLAnchorElement;
                        link.href = (item as Repository).html_url;
                    } else if (searchType === 'users') {
                        card.querySelector('.repo-name')!.textContent = (item as User).login;
                        card.querySelector('.repo-description')!.textContent = 'User/Organization';
                        const link = card.querySelector('.repo-link') as HTMLAnchorElement;
                        link.href = (item as User).html_url;
                    }

                    // Rimuovi la classe nascosta dal clone e aggiungi la card all'elemento "appDiv"
                    card.classList.remove('d-none');
                    appDiv.appendChild(card);
                });

            } catch (error) {
                console.error(`Error fetching ${searchType}:`, error);
                appDiv.innerHTML = '<p>An error occurred. Please try again.</p>';
            }

        } else {
            // Se la ricerca non è lunga abbastanza, mostra un messaggio di avviso
            appDiv.innerHTML = "<p>Please enter at least 3 characters.</p>";
        }
    });
});