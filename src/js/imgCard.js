import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Markup {
  constructor({ selector }) {
    this.items = null;
    this.selector = selector;
    this.lightbox = null;
  }

  imgCard() {
    const markup = this.items
      .map(
        ({ largeImageURL, webformatURL, tags, likes, views, comments, downloadss }) =>
          ` <a class="photo-card"href="${largeImageURL}">
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="pic-card">
        <p class="pic-info">
        <b>Likes</b> <span>${likes}</span>
        </p>
        <p class="pic-info">
        <b>Views</b><span>${views}</span>
        </p>
        <p class="pic-info">
        <b>Comments</b><span>${comments}</span>
        </p>
        <p class="pic-info">
        <b>Downloads</b><span>${downloadss}</span>
        </p>
    </div>
    </div>
    </a>`,
      )
      .join('');
    this.selector.insertAdjacentHTML('beforeend', markup);
    this.initModal('.gallery a');
  }
  initModal(selector) {
    this.lightbox = new SimpleLightbox(selector);
  }
  reset() {
    this.selector.innerHTML = '';
  }
}
