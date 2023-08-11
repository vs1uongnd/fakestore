import View from "./View.js";
import { rating } from "../utils/rating.js";

class SingleProductView extends View {
  _parentElement = document.querySelector(".single-product-wrapper");
  _skeleton = `
    <div class="skeleton skeleton-single-product">
      <div class="image"></div>
      <div class="content">
        <h1></h1>
        <p></p>
        <p></p>
        <h2></h2>
        <p></p>
        <h2></h2>
        <h1></h1>
        <h1></h1>
        <h4></h4>
      </div>
    </div>`;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerAddToCart(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btnAddToCart = e.target.closest(".single-product__cart");
      if (!btnAddToCart) return false;
      const size = this._parentElement.querySelector(
        ".single-product__size"
      ).value;
      const quantityInput = this._parentElement.querySelector(
        ".single-product__quantity"
      );
      if (!quantityInput.value.trim())
        return quantityInput.classList.add("show-error");

      const product = {
        id: this._parentElement.querySelector(".single-product__content")
          .dataset.id,
        size: size,
        quantity: Number(quantityInput.value),
        image: this._parentElement
          .querySelector(".single-product__image img")
          .getAttribute("src"),
        title: this._parentElement.querySelector(".single-product__heading")
          .textContent,
        price: Number(
          this._parentElement
            .querySelector(".single-product__price")
            .textContent.slice(2)
        ),
        rating: {
          rate: Number(
            this._parentElement.querySelector(".single-product__rating").dataset
              .rating
          ),
        },
        description: this._parentElement.querySelector(".single-product__des")
          .innerText,
      };
      handler(product);
      quantityInput.value = "";
    });
  }

  addHandlerChangeInput() {
    this._parentElement.addEventListener("input", () => {
      const quantityInput = this._parentElement.querySelector(
        ".single-product__quantity"
      );
      if (!quantityInput) return;
      if (quantityInput.value && quantityInput.classList.contains("show-error"))
        quantityInput.classList.remove("show-error");
    });
  }

  _generateMarkup() {
    return ` <div class="single-product__image">
              <img
                src="${this._data.image}"
                alt="product"
              />
            </div>
            <div class="single-product__content" data-id="${this._data.id}">
              <h2 class="single-product__heading">${this._data.title}</h2>
              <div class="single-product__rating" data-rating="${
                this._data.rating.rate
              }">
              ${rating(this._data.rating.rate)}
              </div>
              <h4 class="single-product__price">$ ${this._data.price}</h4>
              <form>
                <label for="single-product__size">Size</label>
                <select
                  name="size"
                  id="single-product__size"
                  class="single-product__size"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </form>
              <form>
                <label for="single-product__quantity">Quantity</label>
                <input
                  type="text"
                  class="single-product__quantity"
                  id="single-product__quantity"
                />
                <span class="single-product__quantity-error">fill in this field</span>
              </form>
              <button class="single-product__cart btn--primary">
                Add to Cart
              </button>
              <button class="single-product__buy btn--primary">Buy Now</button>
              <p class="single-product__des">
              ${this._data.description}
              </p>
            </div>
            `;
  }
}

export default new SingleProductView();
