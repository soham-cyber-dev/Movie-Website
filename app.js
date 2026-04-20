const searchForm          = document.querySelector('#search-form');
const searchInput         = document.querySelector('#exampleInputEmail1');
const moviesContainer     = document.querySelector('#movies-container');
const moviesSearchable    = document.querySelector('#movies-searchable');
const searchResultSection = document.querySelector('#search-results-section');
const searchLabel         = document.querySelector('#search-label');
const modalOverlay        = document.querySelector('#modal-overlay');
const modalClose          = document.querySelector('#modal-close');
const modalTitle          = document.querySelector('#modal-title');
const modalVideos         = document.querySelector('#modal-videos');
const modalLoading        = document.querySelector('#modal-loading');
const toastEl             = document.querySelector('#toast');

let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

function handleGeneralError(error) {
  console.error('Error:', error);
  showToast(error.message || 'Something went wrong. Please try again.');
}

function createSkeletons(count = 8) {
  return Array.from({ length: count }, () => {
    const s = document.createElement('div');
    s.className = 'skeleton-card';
    s.innerHTML = `<div class="skeleton-poster"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div>`;
    return s;
  });
}

function createMovieCard(movie) {
  const { poster_path, id, title, vote_average, release_date } = movie;
  const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
  const year     = release_date ? release_date.slice(0, 4) : '';
  const rating   = vote_average ? vote_average.toFixed(1) : 'N/A';

  const card = document.createElement('div');
  card.className = 'movie-card';
  card.dataset.movieId = id;

  card.innerHTML = `
    <img src="${imageUrl}" alt="${title || 'Movie poster'}" loading="lazy" />
    <div class="movie-card-info">
      <p class="movie-card-title">${title || 'Untitled'}</p>
      <div class="movie-card-meta">
        <span class="movie-rating">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ${rating}
        </span>
        ${year ? `<span class="movie-year">${year}</span>` : ''}
      </div>
    </div>
  `;

  card.addEventListener('click', () => openTrailerModal(id, title));
  return card;
}

function renderMoviesRow(data, container) {
  container.innerHTML = '';
  const movies = data.results || [];
  if (movies.length === 0) {
    container.innerHTML = `<div class="empty-state"><h3>No movies found</h3><p>Try searching for something else.</p></div>`;
    return;
  }
  movies.forEach(movie => {
    if (movie.poster_path) container.appendChild(createMovieCard(movie));
  });
}

function createSection(title, badge = null) {
  const section = document.createElement('div');
  section.className = 'movie-section';
  const header = document.createElement('div');
  header.className = 'movie-section-header';
  header.innerHTML = `<h2>${title}</h2>${badge ? `<span class="section-badge">${badge}</span>` : ''}`;
  const row = document.createElement('div');
  row.className = 'movies-row';
  createSkeletons().forEach(s => row.appendChild(s));
  section.appendChild(header);
  section.appendChild(row);
  moviesContainer.appendChild(section);
  return row;
}

function renderMovies(data) {
  renderMoviesRow(data, this.container);
}

function renderSearchMovies(data) {
  searchResultSection.classList.remove('hidden');
  searchLabel.textContent = `Results for "${currentSearchQuery}"`;
  renderMoviesRow(data, moviesSearchable);
}

function openTrailerModal(movieId, title) {
  modalTitle.textContent = title || 'Trailers';
  modalVideos.innerHTML = '';
  modalLoading.classList.remove('hidden');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  getVideosByMovieId(movieId);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  modalVideos.querySelectorAll('iframe').forEach(f => { f.src = f.src; });
  setTimeout(() => { modalVideos.innerHTML = ''; }, 300);
}

function createVideoTemplate(data) {
  modalLoading.classList.add('hidden');
  const videos = (data.results || []).filter(v => v.site === 'YouTube');
  if (videos.length === 0) {
    modalVideos.innerHTML = `<div class="empty-state"><h3>No Trailers Found</h3><p>No YouTube trailers available for this movie.</p></div>`;
    return;
  }
  videos.slice(0, 4).forEach(video => {
    const wrapper = document.createElement('div');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}?rel=0`;
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    wrapper.appendChild(iframe);
    modalVideos.appendChild(wrapper);
  });
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

let currentSearchQuery = '';
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const value = searchInput.value.trim();
  if (!value) return;
  currentSearchQuery = value;
  moviesSearchable.innerHTML = '';
  searchResultSection.classList.remove('hidden');
  searchLabel.textContent = `Searching for "${value}"...`;
  createSkeletons(6).forEach(s => moviesSearchable.appendChild(s));
  searchMovie(value);
  searchInput.value = '';
  searchInput.blur();
});

const trendingRow  = createSection('Trending Today', 'LIVE');
const topRatedRow  = createSection('Top Rated',      'IMDB');
const popularRow   = createSection('Popular Now');
const upcomingRow  = createSection('Coming Soon');

getTrendingMovies(renderMovies.bind({ container: trendingRow }));
getTopRatedMovies(renderMovies.bind({ container: topRatedRow }));
searchPopularMovie(renderMovies.bind({ container: popularRow }));
searchUpcomingMovies(renderMovies.bind({ container: upcomingRow }));
