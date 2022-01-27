import View from "./View.js";

class breweryView extends View {
  _parentElement = document.querySelector(".brewery-feature");
  _errorMessage = "Search a city to find Brewery!";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerFavorites(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".add-to-favorites");
      if (!btn) return;
      console.log("FAVE BUTTON");
      handler();
    });
  }

  _generateMarkup() {
    return `
    <div class="brewery">
    <div class="brewery-header">
      <h1 class="brewery-feature-title">${this._data.name}</h1>
      <p class="brewery-feature-location">${this._data.city}, ${
      this._data.state
    }</p>
      <p class="brewery-feature-type">${this._data.breweryType} brewery</p>
      <button class="add-to-favorites">${
        this._data.favorite ? "Favorited" : "Add To Favorites"
      }</button
    </div>
    <div class="brewery-info">
    <a class="brewery-feature-website brewery-info-item" href="${
      this._data.website
    }">${this._data.website ? this._data.website : "No website available"}</a>
      <p class="brewery-feature-phone brewery-info-item">Phone:<span class="brewery-data-text"> ${
        this._data.phone
          ? this._data.phone.slice(0, 3) +
            "-" +
            this._data.phone.slice(3, 6) +
            "-" +
            this._data.phone.slice(-4)
          : "No phone number<br>available"
      }</span></p>
      <p class="brewery-feature-address brewery-info-item">Address:<span class="brewery-data-text"> ${
        this._data.street ? this._data.street : "No street address available"
      }   ${this._data.city}, ${this._data.state}, ${
      this._data.postalCode ? this._data.postalCode : ""
    }</span></p>
    </div>
  </div>
      
      `;
  }
}

export default new breweryView();
