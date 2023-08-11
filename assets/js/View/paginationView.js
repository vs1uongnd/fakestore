import View from "./View.js";
import { PRODUCTS_PER_PAGE } from "../utils/constants.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".shop .pagination");

  _generateMarkup() {
    const { amountPages, pageCurrent } = this._data;
    const amountPagesCeil = Math.ceil(Number(amountPages) / PRODUCTS_PER_PAGE);
    const markup = [];
    for (let i = 0; i < amountPagesCeil; i++) {
      markup.push(
        `<button type="button" class="btn-pagination" data-page='${i + 1}' ${
          this._data.pageCurrent === i + 1 ? "disabled" : ""
        }>${i + 1}</button>`
      );
    }
    return `${markup.join("")}`;
  }
  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-pagination");
      if (!btn) return;
      const page = Number(btn.dataset.page);
      handler(page);
    });
  }
}

export default new PaginationView();
