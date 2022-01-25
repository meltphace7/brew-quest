import * as model from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import breweryView from "./views/breweryView.js";

const controlSearchResults = async function () {
  try {
    // 1) Get Search Query
    console.log(model.state);
    const query = searchView.getQuery();

    // 2) LOAD BREWERY LIST DATA
    await model.loadSearchResults(query);

    // 3) Render Brewery List

    resultsView.render(model.state.search.results);
    console.log(model.state.search);
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

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  breweryView.addHandlerRender(controlBrewery);
};

init();

// PAGINATION

const prevPage = document.querySelector(".page-btn-prev");
const nextPage = document.querySelector(".page-btn-next");
const findBreweryBtn = document.querySelector(".find-brewery-btn");

findBreweryBtn.addEventListener("click", function (e) {
  model.state.search.page = 1;
});

nextPage.addEventListener("click", function (e) {
  model.state.search.page++;
  console.log(model.state.search.page);
  controlSearchResults();

  console.log("click");
});

prevPage.addEventListener("click", function (e) {
  model.state.search.page--;
  console.log(model.state.search.page);
  controlSearchResults();

  console.log("click");
});
