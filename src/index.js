import './sass/main.scss';
import { fetchImg } from './fechImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  input: document.querySelector('#searchQuery'),
  gallery: document.querySelector('.gallery'),
};

const imgCard = img => {
  console.log(img);
  const markup = img
    .map(({ webformatUR, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
    <a class="photo-card">
  <img src="${webformatUR}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads} </b>
    </p>
  </div>
</a>
`;
    })
    .join('');
  return markup;
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionType: 'alt',
});
gallery.refresh();

const errorSearch = error => {
  Notiflix.Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`,
  );
};

function base(e) {
  e.preventDefault();
  const imagesName = e.target.value;
  if (!imagesName) {
    refs.gallery.innerHTML = ' ';
    return;
  }

  fetchImg(imagesName)
    .then(data => {
      if (data.value >= 1) {
        const markupGall = gallery(data);
        refs.gallery.innerHTML = markupGall;
        return;
      }
    })
    .catch(error => errorSearch(error));
}

refs.input.addEventListener('input');
