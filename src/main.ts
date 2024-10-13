// API call
import axios from 'axios';

let repositories: any[] = [];

// Fetch all public repositories
axios.get('https://api.github.com/repositories')
    .then((response) => {
        repositories = response.data;
        console.log("Fetched repositories:", repositories);
    })
    .catch((error) => {
        console.error("Error fetching repositories:", error);
    });

// Filter repositories based on search input
document.getElementById('searchBtn')?.addEventListener('click', () => {
    const searchBar = document.getElementById('search') as HTMLInputElement;
    const search : string = searchBar.value.toLowerCase();
    const repoNameDiv : any = document.getElementById('repo-name');

    if (search) {
        // Filter the repositories by name
        const filteredRepos = repositories.filter(repo => 
            repo.name.toLowerCase().includes(search)
        );
        console.log("Filtered repositories:", filteredRepos);
        repoNameDiv.innerHTML = filteredRepos.map; 
    } else {
        console.log("Please enter a search term.");
    }
});





