import View from "./View.js";

class SortView extends View {
  _parentElement = document.querySelector(".shop .sort-wrapper");
  _skeleton = `
    <div class="skeleton skeleton-sort">
        <p></p>
    </div>  
    <div class="skeleton skeleton-sort">
      <p></p>
    </div>
    <div class="skeleton skeleton-sort">
      <p></p>
    </div>
    <div class="skeleton skeleton-sort">
      <p></p>
    </div>
    
  `;

  updateQuantityProducts(quantity) {
    this._parentElement.querySelector(
      ".quantity-products"
    ).innerHTML = `${quantity} products found`;
  }

  addHandlerChangeTypeOfList(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const typeBtn = e.target.closest("[data-type]");
      if (!typeBtn) return;
      handler(typeBtn.dataset.type);
    });
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener("change", (e) => {
      const sortSelect = e.target.closest(".sort-select");
      if (!sortSelect) return;
      handler(sortSelect.value);
    });
  }

  _generateMarkup() {
    return `
    <div class="type-of-list">
      <button class="type-grid" data-type="grid">
        <i class="fa-solid fa-table-cells"></i>
      </button>
      <button class="type-rows" data-type="rows">
        <i class="fa-solid fa-list"></i>
      </button>
    </div>
    <p class="quantity-products">${this._data} products found</p>
    <hr />
   
     <select name="sort" id="sort-select" class="sort-select">
        <option value="sort-by" selected="true" disabled="disabled">sort by</option>
        <option value="price-lowest">Price (lowest)</option>
        <option value="price-highest">Price (highest)</option>
        <option value="rating-lowest">Rating (lowest)</option>
        <option value="rating-highest">Rating (highest)</option>
      </select>
    `;
  }
}

export default new SortView();
