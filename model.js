export const state = {
  brewery: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const page = state.search.page;
    const perPage = state.search.resultsPerPage;
    console.log();

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
    console.log(err);
  }
};

export const getBrewery = async function (id) {
  try {
    if (id === "") return;
    const res = await fetch(`https://api.openbrewerydb.org/breweries/${id}`);
    const data = await res.json();
    state.brewery = data;
  } catch (err) {
    console.log(err);
  }
};
