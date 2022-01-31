import View from "./View.js";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".page-btn");
      if (!btn) return;

      const goTo = +btn.dataset.goto;
      console.log(goTo);
      handler(goTo);
    });
  }

  _generateMarkup() {
    const results = this._data.search.results.length;
    const page = this._data.search.page;

    // If there are more than one pages and on first page
    if (results === 10 && page === 1) {
      return `
      <button data-goto="1" class="page-btn page-btn-next">
        Page ${page + 1}
        <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"  stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      `;
    }

    // If there are more than 2 pages and on a middle page
    if (results === 10 && page > 1) {
      return `
      <button data-goto="-1" class="page-btn page-btn-prev">
        <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon"   fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"  stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      Page ${page - 1}</button>
      <button data-goto="1" class="page-btn page-btn-next">Page ${page + 1}
        <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon"    fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"    stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        </button>
      
      `;
    }

    // If there are more than one Pages and on LAST PAGE
    if (results <= 10 && page > 1) {
      return `
      <button data-goto="-1" class="page-btn page-btn-prev">
      <svg xmlns="http://www.w3.org/2000/svg" class="star-favorite-fill-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
        Page ${page - 1}
      </button>
      `;
    }

    // If there are is only 1 page
    if (results < 10 && page === 1) return "";
  }
}

export default new paginationView();
