import * as model from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import breweryView from "./views/breweryView.js";
import paginationView from "./views/paginationView.js";
import favoritesView from "./views/favoritesView.js";

const controlSearchResults = async function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();
    if (query !== model.state.search.query) {
      model.state.search.page = 1;
    }

    // 2) LOAD BREWERY LIST DATA
    await model.loadSearchResults(query);

    // 3) Render Brewery List

    resultsView.render(model.state.search.results);
    paginationView.render(model.state);
    favoritesView.render(model.state.favorites);
  } catch (err) {
    console.log(err);
  }
};

const controlBrewery = async function () {
  try {
    // 1) Get ID

    const id = window.location.hash.slice(1);

    // 2) LOAD BREWERY
    await model.getBrewery(id);

    // 3) Render Brewery List
    breweryView.render(model.state.brewery);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goto) {
  if (goto === 1) model.state.search.page++;
  if (goto === -1 && model.state.search.page !== 1) model.state.search.page--;
  controlSearchResults();
};

const controlAddToFavorites = function () {
  if (!model.state.brewery.favorite) model.addToFavorites(model.state.brewery);
  else model.removeFromFavorites(model.state.brewery.id);
  // else model.removeFromFavorites(model.state.brewery.id);
  breweryView.render(model.state.brewery);
  favoritesView.render(model.state.favorites);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  breweryView.addHandlerRender(controlBrewery);
  paginationView.addHandlerClick(controlPagination);
  breweryView.addHandlerFavorites(controlAddToFavorites);
  favoritesView.render(model.state.favorites);
};

init();
console.log(model.state);

const favoritesList = document.querySelector(".favorites-list");
const favoritesBtn = document.querySelector(".favorites-btn");

// favoritesBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   const clicked = e.target.closest()
// });
