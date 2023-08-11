import View from "./View.js";

class FilterView extends View {
  _parentElement = document.querySelector(".shop .filter");
  _errorMessage = "Sorry, something went wrong";
  _skeleton = `<div class="skeleton skeleton-filter">
                    <h1></h1>
                    <h2></h2>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <h4></h4>
                    <h2></h2>
                    <p></p>
                    <h4></h4>

                </div>`;

  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const category = e.target.closest(".category");
      if (!category) return;
      const categoryActiveNow = document.querySelector(".category.active");
      if (categoryActiveNow) categoryActiveNow.classList.remove("active");
      category.classList.add("active");
      const priceRange = document.querySelector(".price-range");

      handler({
        category: category.textContent,
        priceMax: Number(priceRange.value),
      });
    });

    this._parentElement.addEventListener("input", (e) => {
      const priceRange = e.target.closest(".price-range");
      if (!priceRange) return;
      priceRange.nextElementSibling.innerHTML = priceRange.value;
      const category = document.querySelector(".category.active");
      handler({
        category: category.textContent,
        priceMax: Number(priceRange.value),
      });
    });
  }

  _generateMarkup() {
    return `
    <h3 class="filter__heading">Filter by</h3>
    <div class="option">
      <div class="option__header">
        <h4 class="option__title">Category</h4>
        <button class="option__show">-</button>
      </div>
      <div class="option__body categories">
        <button class='category active'>all</button>
        ${this._data.categories
          .map((category) => `<button class='category'>${category}</button>`)
          .join("")}
      </div>
    </div>
    <div class="option">
      <div class="option__header">
        <h4 class="option__title">Price</h4>
        <button class="option__show">-</button>
      </div>
      <div class="option__body">
        <input class="price-range" type="range" min="${
          this._data.rangePrice[0]
        }" max="${Math.ceil(this._data.rangePrice[1]) + 1}" value="${
      this._data.rangePrice[1]
    }" />
        <p class="price--current">$${this._data.rangePrice[1]}</p>
      </div>
    </div> 
    `;
  }
}

export default new FilterView();
