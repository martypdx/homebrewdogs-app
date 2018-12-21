let token = '';

const getOptions = (method, data) => {
  const options = {
    method,
    headers: {}
  };

  if(data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if(token) {
    options.headers.Authorization = token;
  }

  return options;
};

export default {

  setToken(t) {
    token = t;
  },

  signUp(profile) {
    return fetch('/api/auth/signup', getOptions('POST', profile))
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        return response.json()
          .then(error => {
            return Promise.reject(error);
          });
      });
  },

  signIn(credentials) {
    return fetch('/api/auth/signin', getOptions('POST', credentials))
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        return response.json()
          .then(error => {
            return Promise.reject(error);
          });
      });
  },
  getFavorites() {
    return fetch('/api/favorites', getOptions('GET'))
      .then(response => response.json());
  },
  addFavorite(name) {
    return fetch('/api/favorites', getOptions('POST', name))
      .then(response => response.json());
  },
  getBeers() {
    return fetch('https://api.punkapi.com/v2/beers', getOptions('GET'))
      .then(response => response.json());
  },
  getBeer(id) {
    return fetch(`https://api.punkapi.com/v2/beers/${id}`)
      .then(response => response.json());
  },
  getBeerByKeyword(keyword, page = 1) {
    return fetch(`https://api.punkapi.com/v2/beers?beer_name=${keyword}&page=${page}`)
      .then(response => response.json());
  },
  getRandomBeer() {
    return fetch('https://api.punkapi.com/v2/beers/random')
      .then(response => response.json());
  },  
  addComment(comment) {
    return fetch('/api/favorites', getOptions('PUT', comment));
  },
  addRating(rating) {
    return fetch('/api/ratings', getOptions('POST', rating));
  },
  deleteFavorite(id) {

    // console.log(id);
    return fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    })
      .then(response => response.json());
  }
};