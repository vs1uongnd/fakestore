export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
 
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSkeleton() {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", this._skeleton);
  }
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
              <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // renderMessage(message = this._message) {
  //   const markup = `
  //         <div class="message">
  //             <p>${message}</p>
  //         </div>
  //     `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }
}
