const response = await fetch("https://api.tvmaze.com/shows");
const data = await response.json();

const dataDiv1 = document.querySelector("#imgs");
data.slice(0,40).forEach(films => {
    dataDiv1.innerHTML += `
     <div class="row">
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
data.slice(40,80).forEach(films => {
    dataDiv2.innerHTML += `
     <div class="row">
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
data.slice(80,120).forEach(films => {
    dataDiv3.innerHTML += `
     <div class="row">
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
data.slice(120,160).forEach(films => {
    dataDiv4.innerHTML += `
     <div class="row">
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







//<a href="${films.officialSite}" class="card-link">Click and watch</a>



