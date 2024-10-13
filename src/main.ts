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
    const search: string = searchBar.value.toLowerCase();
    const repoNameDiv = document.getElementById('repo-name');

    if (search && repoNameDiv) {
        // Filter the repositories by name
        const filteredRepos = repositories.filter(repo => 
            repo.name.toLowerCase().includes(search)
        );

        console.log("Filtered repositories:", filteredRepos);

        // Generate HTML for filtered repositories
        if (filteredRepos.length > 0) {
            const repoList = filteredRepos.map(repo => `<li>${repo.name}</li>`).join('');
            repoNameDiv.innerHTML = `<ul>${repoList}</ul>`;
        } else {
            repoNameDiv.innerHTML = "<p>No repositories found.</p>";
        }
    } else {
        console.log("Please enter a search term.");
    }
});





