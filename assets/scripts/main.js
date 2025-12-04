const response = await fetch("https://api.tvmaze.com/shows?&select=key1,key2,key3");
const data = await response.json();

const cardsDiv = document.querySelector(".cards");
data.forEach(films => {
    cardsDiv.innerHTML += `
     <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${films.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${films.type}</h6>
                        <p class="card-text">${films.genres}</p>
                        <a href="${films.url}" class="card-link">Film Linki</a>
                        <a href="${films.officialSite}" class="card-link">Sayt Linki</a>
                    </div>
                </div>
            </div>
  


    `
});

console.log(data);
