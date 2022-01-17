import './sass/main.scss';
import SearchImagesAPI from './api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  SearchImagesAPI: new SearchImagesAPI(),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionType: 'alt',
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  refs.SearchImagesAPI.query = e.target.elements.searchQuery.value.trim();
  refs.SearchImagesAPI.resetPage();
  refs.gallery.innerHTML = '';

  if (refs.SearchImagesAPI.query) {
    refs.SearchImagesAPI.fetchImg().then(data => {
      if (data.hits.length < 40) {
        Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
        refs.btnLoadMore.classList.add('is-hidden');
        imgCard(data);
        return;
      }
      imgCard(data);
    });
  }
});

function imgCard(data) {
  const markup = data.hits
    .map(item => {
      return `
      <a class="photo-card"href="${item.largeImageURL}">
    <div >
    <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
    <div class="pic-card">
        <p class="pic-info">
        <b>Likes</b> <span>${item.likes}</span>
        </p>
        <p class="pic-info">
        <b>Views</b><span>${item.views}</span>
        </p>
        <p class="pic-info">
        <b>Comments</b><span>${item.comments}</span>
        </p>
        <p class="pic-info">
        <b>Downloads</b><span>${item.downloads}</span>
        </p>
    </div>
    </div>
    </a>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// const onLoadMore = () => {
//   page += 1;
//   getData(refs.input.value);
//   if (page > 40) {
//     Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
//     refs.btnMore.classList.add('is-hidden');
//   }
// };
