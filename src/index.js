import './sass/main.scss';
import { fetchImg } from './fechImages.js';

import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
};

const imgCard = img => {
  const markup = img
    .map(({ webformatUR, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="gallery">
  <a href="${largeImageURL}"
    ><img src="${webformatURL}" alt="" title="" />
    <div
      class="photo-card"
      style="border: 1px solid #009688; border-radius: 4px; margin-bottom: 5px"
    >
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="260px" height="150px" />
      <div class="info">
        <p class="info-item">
          <b> Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b> Views: ${views}</b>
        </p>
        <p class="info-item">
          <b> Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b> Downloads: ${downloads}</b>
        </p>
      </div>
    </div></a
  >
</div>`;
    })
    .join('');
  return markup;
};

let page = 1;

const getData = (imagesName, page) => {
  fetchImg(imagesName, page)
    .then(data => {
      const { hits, totalHits } = data;
      if (!totalHits) {
        throw new Error('');
      }
      const markup = imgCard(hits);
      refs.gallery.insertAdjacentHTML('beforeend', markup);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      refs.btnMore.classList.remove('is-hidden');

      return;
    })
    .catch(error => errorSearch(error));
};

const galleryImg = e => {
  e.preventDefault();
  let imagesName = input.value;

  if (!imagesName) {
    refs.gallery.innerHTML = ' ';
    return;
  }
  page = 1;
  getData(imagesName, page);
};

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   captionType: 'alt',
// });

const errorSearch = error => {
  Notiflix.Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`,
  );
};

const onLoadMore = () => {
  page += 1;
  getData(refs.input.value);
  if (page > 40) {
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    refs.btnMore.classList.add('is-hidden');
  }
};

refs.form.addEventListener('submit', galleryImg);
