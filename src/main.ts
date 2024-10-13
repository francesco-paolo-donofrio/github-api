document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search') as HTMLInputElement;
    const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
    const searchTypeDropdown = document.getElementById('searchType') as HTMLSelectElement;
    const appDiv = document.getElementById('app') as HTMLDivElement;

    // Template card HTML
    const cardTemplate = `
        <div class="wrapper">
            <h1 class="card-title"></h1>
            <p class="card-description"></p>
            <a href="#" target="_blank" class="btn outline">VIEW ON GITHUB</a>
        </div>
    `;

    searchBtn.addEventListener('click', () => {
        const searchQuery = searchBar.value.trim();
        const searchType : any = searchTypeDropdown.value; 

        if (searchQuery) {
            fetchData(searchQuery, searchType);
        } else {
            appDiv.innerHTML = "<p>Please enter a search term.</p>";
        }
    });

    async function fetchData(query: string, type: 'repositories' | 'users') {
        try {
            // Mostra il caricamento
            appDiv.innerHTML = "<p>Loading...</p>";
            
            // Endpoint diverso in base al tipo di ricerca
            const apiUrl = type === 'repositories'
                ? `https://api.github.com/search/repositories?q=${query}&per_page=10`
                : `https://api.github.com/search/users?q=${query}&per_page=10`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            // Filtra e mostra i risultati
            renderResults(data.items, type);
        } catch (error) {
            console.error('Error fetching data:', error);
            appDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
        }
    }

    function renderResults(results: any[], type: 'repositories' | 'users') {
        if (results.length === 0) {
            appDiv.innerHTML = `<p>No ${type} found.</p>`;
            return;
        }

        // Pulisce il contenuto precedente
        appDiv.innerHTML = '';

        // Cicla su ogni risultato e crea una card
        results.forEach(result => {
            const card = document.createElement('div');
            card.innerHTML = cardTemplate;

            if (type === 'repositories') {
                // Gestisce il rendering delle repository
                card.querySelector('.card-title')!.textContent = result.name;
                card.querySelector('.card-description')!.textContent = result.description || 'No description available.';
                card.querySelector('a')!.setAttribute('href', result.html_url);
            } else {
                // Gestisce il rendering degli utenti/organizzazioni
                card.querySelector('.card-title')!.textContent = result.login;
                card.querySelector('.card-description')!.textContent = `Type: ${result.type}`;
                card.querySelector('a')!.setAttribute('href', result.html_url);
            }

            // Aggiunge la card al contenitore
            appDiv.appendChild(card);
        });
    }
});




