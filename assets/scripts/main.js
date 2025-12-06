const response = await fetch("https://api.tvmaze.com/shows?&select=key1,key2,key3");
const data = await response.json();

const cardsDiv = document.querySelector("#imgs");
data.forEach(films => {
    cardsDiv.innerHTML += `
     <div class="row">
                <div class="img" style="width: 18rem;">
                    <div class="images">
                        <img src="${films.image.medium}"</img>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${films.name}</h6>
                        
                        
                    </div>
                </div>
            </div>

    `
});

console.log(data);


// const namesDiv=document.querySelector("#names");
// data.forEach(filmss => {
//     cardsDiv.innerHTML +=`
//     <div class="row">
//                 <div class="nms" style="width: 18rem;">
//                     <div class="names">
//                         
                        
//                     </div>
//                 </div>
//             </div>
//     `
// });

// <h3>${films.name}</h5>
                        // 
                        // <p class="card-text">${films.genres}</p>
                        // 
                        // <a href="${films.officialSite}" class="card-link">Sayt Linki</a>


