import axios from 'axios';

const API_KEY = '25246001-e9af07b1bf79602e0';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImg = async (data, page) => {
  const result = await axios.get(
    `?key=${API_KEY}&q=${data}&imageType=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  );
  const { hits, totalHits } = result.data;

  return { hits, totalHits };
};

export { fetchImg };
