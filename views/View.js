export default class View {
  _data;
  _message;
  _errorMessage;

  render(data) {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      Object.keys(data).length === 0
    )
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <div>
      </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
