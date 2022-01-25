import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".brewery-list");
  _errorMessage = "No Breweries found, please try again!";

  _generateMarkup() {
    const markup = this._data.map(this._generateMarkupPreview).join("");
    return markup;
  }

  _generateMarkupPreview(result) {
    return `
    <li class="brewery-li">
    <a class="brewery-link" href="#${result.id}">
      <h1 class="brewery-link-title">${result.name}</h1>
      <p class="brewery-link-town">${result.city}, ${result.state}</p>
    </a>
  </li>
    `;
  }
}

export default new ResultsView();
