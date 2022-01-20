import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '25246001-e9af07b1bf79602e0ca8b6951';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = null;
    this.totalPages = null;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  async fetchImg() {
    try {
      const getImg = await axios
        .get(
          `https://pixabay.com/api/?key=${API_KEY}&q&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
        )
        .then(response => {
          if (this.page === 1 && response.data.totalHits !== 0) {
            Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
          }
          if (response.data.hits.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
            );
            return;
          }
          this.incrementPage();
          return response.data;
        });
      return getImg;
    } catch (error) {
      Notiflix.Notify.failure(`${error}`);
    }
  }
}
