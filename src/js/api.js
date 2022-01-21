const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25246001-e9af07b1bf79602e0ca8b6951';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
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
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const axios = require('axios').default;
    try {
      const response = await axios.get(url);
      this.incrementPage();
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
