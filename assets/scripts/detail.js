import { fetchShowById } from '../js/api.js';

const titleEl = document.querySelector('.detail-title');
const langEl = document.querySelector('.detail-lang');
const ratingEl = document.querySelector('.detail-rating');
const summaryEl = document.querySelector('.detail-summary');
const posterEl = document.querySelector('.detail-poster');
const genresEl = document.querySelector('.detail-genres');
const runtimeEl = document.querySelector('.detail-runtime');
const premieredEl = document.querySelector('.detail-premiered');

function parseId() {
  const params = new URLSearchParams(location.search);
  return params.get('id');
}

async function renderDetail() {
  const id = parseId();

  
  let show = null;
  try {
    const stored = localStorage.getItem('selectedShow');
    if (stored) {
      const parsed = JSON.parse(stored);
      
      if (parsed && (!id || String(parsed.id) === String(id))) {
        show = parsed;
        
        localStorage.removeItem('selectedShow');
      }
    }
  } catch (err) {
    console.warn('Could not read selectedShow from localStorage', err);
  }

  if (!show && !id) {
    titleEl.textContent = 'No ID provided';
    return;
  }

  try {
    if (!show) {
      show = await fetchShowById(id);
    }
    titleEl.textContent = show.name || '';
    langEl.textContent = show.language || '—';
    ratingEl.textContent = show.rating && show.rating.average ? show.rating.average : 'N/A';
    genresEl.textContent = (show.genres && show.genres.join(', ')) || '—';
    runtimeEl.textContent = show.runtime ? `${show.runtime} min` : '—';
    premieredEl.textContent = show.premiered || '—';
    summaryEl.innerHTML = show.summary || '<p>No synopsis available.</p>';

  

    const imgSrc = show.image && show.image.original ? show.image.original : (show.image && show.image.medium) || '';
    if (imgSrc) {
      posterEl.src = imgSrc;
      posterEl.alt = show.name || 'Movie Poster';
    } else {
      posterEl.style.display = 'none';
    }

    
    posterEl.addEventListener('click', () => {
      posterEl.classList.toggle('enlarged');
    });

    
    const backBtn = document.querySelector('.back-home');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '../../index.html';
        }
      });
    }

  } catch (err) {
    titleEl.textContent = 'Error loading show details';
    console.error(err);
  }
}

renderDetail();
