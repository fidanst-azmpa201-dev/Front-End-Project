const response = await fetch("https://api.tvmaze.com/shows");
const data = await response.json();

const dataDiv1 = document.querySelector("#imgs");
data.slice(0,10).forEach(films => {
    dataDiv1.innerHTML += `
     <div class="row" data-id="${films.id}">
                <div class="img" style="width: 18rem;">
                    <div class="images">
                        <h4 class="card-subtitle mb-2 text-body-secondary">${films.name}</h4>
                        <img src="${films.image.medium}"</img>
                        <h5 class="card-subtitle mb-2 text-body-secondary">${films.language}</h5>
                        <p class="card-text">${films.genres}</p>
                        
                        
                    </div>
                </div>
            </div>

    `
});

const dataDiv2 = document.querySelector("#imgs2");
data.slice(10,20).forEach(films => {
    dataDiv2.innerHTML += `
     <div class="row" data-id="${films.id}">
                <div class="img" style="width: 18rem;">
                    <div class="images">
                        <h4 class="card-subtitle mb-2 text-body-secondary">${films.name}</h4>
                        <img src="${films.image.medium}"</img>
                        <h5 class="card-subtitle mb-2 text-body-secondary">${films.language}</h5>
                        <p class="card-text">${films.genres}</p>
                          
                        
                    </div>
                </div>
            </div>

    `
});

const dataDiv3 = document.querySelector("#imgs3");
data.slice(20,30).forEach(films => {
    dataDiv3.innerHTML += `
     <div class="row  data-id="${films.id}"">
                <div class="img" style="width: 18rem;">
                    <div class="images">
                        <h4 class="card-subtitle mb-2 text-body-secondary">${films.name}</h4>
                        <img src="${films.image.medium}"</img>
                        <h5 class="card-subtitle mb-2 text-body-secondary">${films.language}</h5>
                        <p class="card-text">${films.genres}</p>
                        
                        
                        
                    </div>
                </div>
            </div>

    `
});

const dataDiv4=document.querySelector("#imgs4");
data.slice(30,40).forEach(films => {
    dataDiv4.innerHTML += `
     <div class="row  data-id="${films.id}"">
                <div class="img" style="width: 18rem;">
                    <div class="images">
                        <h4 class="card-subtitle mb-2 text-body-secondary">${films.name}</h4>
                        <img src="${films.image.medium}"</img>
                        <h5 class="card-subtitle mb-2 text-body-secondary">${films.language}</h5>
                        <p class="card-text">${films.genres}</p>
                     
                    </div>
                </div>
            </div>

    `
});




const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
    const itemLength=movieLists[i].querySelectorAll("img").length;
    arrow.addEventListener("click", () => {   
        movieLists[i].style.transform = `translateX(${
            movieLists[i].computedStyleMap().get("transform")[0].x.value
            - 270}px)`;
    });
});


const moviesContainer = document.getElementById("imgs4");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let page = 1;
const limit = 8;

async function loadMovies() {
    try {
        const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
        const data = await res.json();

        const sliced = data.slice(0, limit);

        sliced.forEach(films => {
            const imgSrc = films.image && films.image.medium ? films.image.medium : 'assets/images/OIP.webp';
            moviesContainer.innerHTML += `
                <div class="row" data-id="${films.id}">
                    <div class="img" style="width: 18rem;">
                        <div class="images">
                            <h4 class="card-subtitle mb-2 text-body-secondary">${films.name}</h4>
                            <img src="${imgSrc}" alt="${films.name}"/>
                            <h5 class="card-subtitle mb-2 text-body-secondary">${films.language || 'N/A'}</h5>
                            <p class="card-text">${(films.genres && films.genres.join(', ')) || ''}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        page++;

    } catch (err) {
        console.log("Error:", err);
    }
}

loadMoreBtn.addEventListener("click", loadMovies);
loadMovies();


document.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const row = img.closest('[data-id]');
    if (!row) return;
    const id = row.dataset.id;
    if (!id) return;
    const show = data.find(s => String(s.id) === String(id));
    if (show) {
        try {
            localStorage.setItem('selectedShow', JSON.stringify(show));
        } catch (err) {
            console.error('Could not save show to localStorage', err);
        }
    }

    window.location.href = `assets/htmls/detail.html?id=${encodeURIComponent(id)}`;
});


const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');
const searchContainer = document.querySelector('.search-container');
let isSearchActive = false;

searchIcon.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!isSearchActive) {
       
        searchContainer.classList.add('active');
        isSearchActive = true;
        searchInput.focus();
    } else {
        
        const query = searchInput.value.trim();
        if (query) {
            await performSearch(query);
        } else {
            
            collapseSearch();
        }
    }
});

searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            await performSearch(query);
        }
    }
});

searchInput.addEventListener('blur', () => {
    if (!searchInput.value.trim()) {
        collapseSearch();
    }
});

function collapseSearch() {
    searchContainer.classList.remove('active');
    searchInput.value = '';
    isSearchActive = false;
}

async function performSearch(query) {
    try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        const searchResults = await res.json();
        
       
        const resultsData = searchResults.map(item => item.show);
        updateMovieGrid(dataDiv1, resultsData.slice(0, 10));
        
        
        dataDiv2.innerHTML = '';
        dataDiv3.innerHTML = '';
        dataDiv4.innerHTML = '';
        
        
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        
        collapseSearch();
    } catch (err) {
        console.error('Search error:', err);
    }
}

function updateMovieGrid(container, movies) {
    container.innerHTML = '';
    movies.forEach(film => {
        const imgSrc = film.image && film.image.medium ? film.image.medium : 'assets/images/OIP.webp';
        container.innerHTML += `
            <div class="row" data-id="${film.id}">
                <div class="img" style="width: 18rem;">
                    <div class="images">
                        <h4 class="card-subtitle mb-2 text-body-secondary">${film.name}</h4>
                        <img src="${imgSrc}" alt="${film.name}"/>
                        <h5 class="card-subtitle mb-2 text-body-secondary">${film.language || 'N/A'}</h5>
                        <p class="card-text">${(film.genres && film.genres.join(', ')) || ''}</p>
                    </div>
                </div>
            </div>
        `;
    });
}





