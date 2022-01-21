import './sass/main.scss';
import PixabayApiService from './js/api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import imgTpl from './templates/imgCard.hbs';

const refs = {
  inputForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const newsApi = new PixabayApiService();

refs.inputForm.addEventListener('submit', onForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let windHits = 0;

loadBtnHide();

function onForm(e) {
  e.preventDefault();

  newsApi.query = e.currentTarget.elements.searchQuery.value.trim();
  newsApi.resetPage();
  newsApi.fetchImg().then(({ hits, totalHits }) => {
    loadBtnShow();
    removeGal();

    windHits = 0;
    windHits += hits.length;

    if (totalHits === 0) {
      loadBtnHide();
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    imgMarkup(hits);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    let { height: cardHeight } = document.querySelector('.gallery').getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });
}

function onLoadMore() {
  newsApi.fetchImg().then(({ hits, totalHits }) => {
    imgMarkup(hits);

    let { height: cardHeight } = document.querySelector('.gallery').getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    windHits += hits.length;
    if (windHits >= totalHits) {
      loadBtnHide();
      Notiflix.Notify.warning('We are sorry, but you have reached the end of search results.');
    }
  });
}

function imgMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imgTpl(hits));
  new SimpleLightbox('.gallery a');
}

function loadBtnShow() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function loadBtnHide() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function removeGal() {
  refs.gallery.innerHTML = '';
}
