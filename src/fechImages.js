const API_KEY = '25246001-e9af07b1bf79602e0';

const fetchImg = imagesName => {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${data}&imageType=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  ).then(response => {
    if (response.status === 404) {
      return Promise.reject(new Error(`oooops`));
    }
    return response.json();
  });
};

export { fetchImg };
