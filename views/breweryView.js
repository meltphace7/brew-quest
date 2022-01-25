import View from "./View.js";

class breweryView extends View {
  _parentElement = document.querySelector(".brewery-feature");

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
    <div class="brewery">
    <div class="brewery-header">
      <h1 class="brewery-feature-title">${this._data.name}</h1>
      <p class="brewery-feature-location">${this._data.city}, ${
      this._data.state
    }</p>
      <p class="brewery-feature-type">${this._data.brewery_type} brewery</p>
    </div>
    <div class="brewery-info">
      <p class="brewery-feature-phone">${
        this._data.phone
          ? this._data.phone.slice(0, 3) +
            "-" +
            this._data.phone.slice(3, 6) +
            "-" +
            this._data.phone.slice(-4)
          : "No phone number<br>available"
      }</p>
      <a class="brewery-feature-website" href="${this._data.website_url}">${
      this._data.website_url
    }</a>
      <p class="brewery-feature-address">${this._data.street}   ${
      this._data.city
    }, ${this._data.state}</p>
    </div>
  </div>
      
      `;
  }
}

export default new breweryView();
