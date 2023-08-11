import View from "./View.js";
import { rating } from "../utils/rating.js";

class ProductsView extends View {
  _parentElement = document.querySelector(".shop .products");
  _errorMessage = "Sorry, something went wrong. We can't find any products";
  _skeleton = [0, 1, 2, 3, 4, 5, 6, 7]
    .map(
      (i) => `<div class="skeleton skeleton-product">
                <div class="image"></div>
                <div class="content">
                  <h2></h2>
                  <p></p>
                </div>
              </div>`
    )
    .join("");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  changeTypeOfList(typeList) {
    typeList === "rows"
      ? this._parentElement.classList.add("rows")
      : this._parentElement.classList.remove("rows");
  }

  _generateMarkup() {
    return this._data
      .map(
        (product) =>
          `<article class="product">
            <a href="singleProduct.html#${product.id}">
                <div class="product__header">
                <img
                    src="${product.image}"
                    alt="product-image"
                    loading="lazy"
                />
                </div>
                <div class="product__content">
                  <h4 class="product__name">${product.title}</h4>
                  <p class="product__des">${product.description}</p>
                  <div>
                    <p class="product__price">$${product.price}</p>
                    ${rating(product.rating.rate)}
                  </div>

                </div>
            </a>
        </article>`
      )
      .join("");
  }
}

export default new ProductsView();
