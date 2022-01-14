const fetchImg = imagesName => {
  return fetch(
    'https://pixabay.com/api/?key=25246001-e9af07b1bf79602e0ca8b6951&q=${imagesName}&image_type=photo&orientation=horizontal&safesearch=true',
  ).then(r => {
    if (r.status === 404) {
      return Promise.reject(
        new Error(`Sorry, there are no images matching your search query. Please try again.`),
      );
    }
    return r.json();
  });
};

export { fetchImg };
