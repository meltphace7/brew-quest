export const state = {
  brewery: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
  favorites: [],
};

// FORMATS DATA to be used in INDIVIDUAL BREWERY RENDER
const createBreweryObject = function (data) {
  return {
    id: data.id,
    name: data.name,
    city: data.city,
    state: data.state,
    phone: data.phone,
    street: data.street,
    website: data.website_url,
    breweryType: data.brewery_type,
    postalCode: data.postal_code,
  };
};

// LOADS LIST OF BREWERIES to be RENDERED
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const page = state.search.page;
    const perPage = state.search.resultsPerPage;

    const res = await fetch(
      `https://api.openbrewerydb.org/breweries?by_city=${query}&per_page=${perPage}&page=${page}`
    );
    const data = await res.json();
    state.search.results = data.map((brew) => {
      return {
        id: brew.id,
        name: brew.name,
        city: brew.city,
        state: brew.state,
      };
    });
  } catch (err) {
    throw err;
  }
};

// LOADS individual BREWERY to be RENDERED
export const getBrewery = async function (id) {
  try {
    if (id === "") return;

    const res = await fetch(`https://api.openbrewerydb.org/breweries/${id}`);
    const data = await res.json();
    state.brewery = createBreweryObject(data);
    if (state.favorites.some((fav) => fav.id === id)) {
      state.brewery.favorite = true;
    } else {
      state.brewery.favorite = false;
    }
  } catch (err) {
    throw err;
  }
};

const persistFavorites = function () {
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
};

export const addToFavorites = function (brewery) {
  state.favorites.push(brewery);

  state.brewery.favorite = true;
  persistFavorites();
};

export const removeFromFavorites = function (id) {
  const index = state.favorites.findIndex((el) => el.id === id);
  state.favorites.splice(index, 1);

  if (id === state.brewery.id) state.brewery.favorite = false;
  persistFavorites();
};

const init = function () {
  const storage = localStorage.getItem("favorites");
  if (storage) state.favorites = JSON.parse(storage);
};

init();
