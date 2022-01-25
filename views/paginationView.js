import View from "./View.js";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".page-btn");
      if (!btn) return;
      console.log("PAGE BTN");

      const goTo = +btn.dataset.goto;
      console.log(goTo);
      handler(goTo);
    });
  }

  _generateMarkup() {
    const results = this._data.search.results.length;
    const page = this._data.search.page;
    console.log(page);

    // If there are more than one pages and on first page
    if (results === 10 && page === 1) {
      return `
      <button data-goto="1" class="page-btn page-btn-next">Next Page</button>
      `;
    }

    // If there are more than 2 pages and on a middle page
    if (results === 10 && page > 1) {
      return `
      <button data-goto="-1" class="page-btn page-btn-prev">Prev Page</button>
      <button data-goto="1" class="page-btn page-btn-next">Next Page</button>
      
      `;
    }

    // If there are more than one Pages and on LAST PAGE
    if (results <= 10 && page > 1) {
      return `
      <button data-goto="-1" class="page-btn page-btn-prev">Prev Page</button>
      `;
    }

    // If there are is only 1 page
    if (results < 10 && page === 1) return "";
  }
}

export default new paginationView();
