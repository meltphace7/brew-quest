import * as model from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import breweryView from "./views/breweryView.js";
import paginationView from "./views/paginationView.js";

const controlSearchResults = async function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();

    // 2) LOAD BREWERY LIST DATA
    await model.loadSearchResults(query);

    // 3) Render Brewery List

    resultsView.render(model.state.search.results);
    paginationView.render(model.state);
    console.log(model.state.search.results);
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
  console.log(`page ${model.state.search.page}`);
  controlSearchResults();
  console.log("CONTROL PAGINATIOn");
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  breweryView.addHandlerRender(controlBrewery);
  paginationView.addHandlerClick(controlPagination);
  console.log(model.state);
};

init();

// PAGINATION

const prevPage = document.querySelector(".page-btn-prev");
const nextPage = document.querySelector(".page-btn-next");
const pagination = document.querySelector(".pagination");
const findBreweryBtn = document.querySelector(".find-brewery-btn");

findBreweryBtn.addEventListener("click", function (e) {
  model.state.search.page = 1;
});
