class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".brew-search-field").value;
    // this._clearInput();
    return query;
  }

  _clearInput() {
    return (this._parentElement.querySelector(".brew-search-field").value = "");
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
