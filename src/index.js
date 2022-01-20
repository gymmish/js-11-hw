import './sass/main.scss';
import PixabayApiService from './api';
import Notiflix from 'notiflix';

import btnMore from './js/btnMore';
import Markup from './js/imgCard';

const refs = {
  inputForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const imgApi = new PixabayApiService();
const loadMore = new btnMore({ selector: '.load-more' });
const imgCard = new Markup({ selector: refs.gallery });

refs.inputForm.addEventListener('submit', surchForn);
loadMore.button.addEventListener('click', onMoreBtn);

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   captionType: 'alt',
// });

async function surchForn(e) {
  e.preventDefault();

  imgApi.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  imgApi.incrementPage();
  imgApi.resetPage();

  if (imgApi.searchQuery === '') {
    loadMore.hideBtn();
    Notiflix.Notify.failure('enter your request!');
    return;
  }

  imgApi.resetPage();
  clearContainet();
  fetchQuery();
}

// function fetchQuery() {
//   imgApi.fetchPictures().then(data => {
//     if (data.totalHits === 0) {
//       return Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again',
//       );
//     }
//     Notiflix.Notify.success(`Hooray! We found ${data.total} images`);
//     renderGallaryMarkup(data);
//   });
// }

// const onLoadMore = () => {
//   page += 1;
//   getData(refs.input.value);
//   if (page > 40) {
//     Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
//     refs.btnMore.classList.add('is-hidden');
//   }
// };
