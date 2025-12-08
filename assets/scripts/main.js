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
                         <p class="card-text">${films.summary}</p>
                        
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
                         <p class="card-text">${films.summary}</p>
                        
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
                         <p class="card-text">${films.summary}</p>
                        
                        
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
                        <p class="card-text">${films.summary}</p>
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
            moviesContainer.innerHTML += `

             <div class="images">
                        <h4 class="card-subtitle mb-2 text-body-secondary">${films.name}</h4>
                        <img src="${films.image.medium}"</img>
                        <h5 class="card-subtitle mb-2 text-body-secondary">${films.language}</h5>
                        <p class="card-text">${films.genres}</p>
                        <p class="card-text">${films.summary}</p>
                
            `;
        });

        page++;

    } catch (err) {
        console.log("Error:", err);
    }
}

loadMoreBtn.addEventListener("click", loadMovies);
loadMovies();





