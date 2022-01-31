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
        this._data.favorite
          ? `
          <svg xmlns="http://www.w3.org/2000/svg" class="star-favorite-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Favorited`
          : `  
          Add To Favorites`
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
        <p class="brewery-feature-address brewery-info-item"> Address: <span class="brewery-data-text">  ${
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
