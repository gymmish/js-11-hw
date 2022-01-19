import './sass/main.scss';
import PixabayApiService from './api';
import Notiflix from 'notiflix';

import PixabayApiService from './api';

import btnMore from './js/btnMore';
import Markup from './js/imgCard';

const refs = {
  inputForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const imgApi = new PixabayApiService();
const btnMore = new LoadMoreBtn({ selector: '.load-more' });
const imgCard = new Markup({ selector: refs.gallery });

refs.inputForm.addEventListener('submit', surchForn);
btnMore.button.addEventListener('click', onMoreBtn);

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   captionType: 'alt',
// });

async function surchForn(e) {
  e.preventDefault();

  imgCard.reset();
  imgApi.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (imgApi.searchQuery === '') {
    btnMore.hideBtn();
    Notiflix.Notify.failure('enter your request!');
    return;
  }

  imgApi.resetPage();
  clearContainet();
  fetchQuery();
}

function fetchQuery() {
  imgApi.fetchPictures().then(data => {
    if (data.totalHits === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again',
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${data.total} images`);
    renderGallaryMarkup(data);
  });
}

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
