

function createCardHTML(show) {
  const imgSrc = show.image && show.image.medium ? show.image.medium : 'assets/images/OIP.webp';
  const genres = (show.genres && show.genres.join(', ')) || '';
  return `
    <div class="card" data-id="${show.id}">
      <div class="images">
        <h4 class="card-subtitle">${show.name || ''}</h4>
        <img class="card-img" src="${imgSrc}" alt="${show.name || ''}"/>
        <h5 class="card-lang">${show.language || ''}</h5>
        <p class="card-genres">${genres}</p>
      </div>
    </div>
  `;
}

export function clearContainer(container) {
  container.innerHTML = '';
}


export function renderShowsGrid(container, shows = [], { append = false } = {}) {
  if (!append) container.innerHTML = '';

  let fragment = document.createDocumentFragment();
 
  let currentRow;
  if (append && container.lastElementChild && container.lastElementChild.classList.contains('row')) {
    currentRow = container.lastElementChild;
  }

  shows.forEach((show, i) => {
    if (!currentRow || currentRow.childElementCount >= 4) {
      currentRow = document.createElement('div');
      currentRow.className = 'row';
      fragment.appendChild(currentRow);
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'col-1-of-4';
    wrapper.innerHTML = createCardHTML(show);
    currentRow.appendChild(wrapper);
  });

  container.appendChild(fragment);
}

export function createCardElement(show) {
  const div = document.createElement('div');
  div.className = 'card';
  div.dataset.id = show.id;
  div.innerHTML = createCardHTML(show);
  return div;
}
