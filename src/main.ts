// API call
import axios from "axios";


axios.get('https://api.github.com/users/').then((response) => {
    console.log(response.data);
})

document.getElementById('searchBtn')?.addEventListener('click', () =>{
    const searchBar = document.getElementById('search') as HTMLInputElement;
    const search = searchBar.value;
    console.log(search);
})





