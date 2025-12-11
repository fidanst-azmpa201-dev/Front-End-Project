// API helper functions for TVMaze
const BASE = 'https://api.tvmaze.com';

export async function fetchAllShows() {
  const res = await fetch(`${BASE}/shows`);
  return res.json();
}

export async function fetchShowsByPage(page = 0) {
  const res = await fetch(`${BASE}/shows?page=${page}`);
  return res.json();
}

export async function searchShows(query) {
  if (!query) return [];
  const res = await fetch(`${BASE}/search/shows?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  // `search` endpoint returns { score, show }
  return data.map(item => item.show);
}

export async function fetchShowById(id) {
  const res = await fetch(`${BASE}/shows/${id}`);
  return res.json();
}
