import { rating } from "../utils/rating.js";
import View from "./View.js";

class CartView extends View {
  _parentElement = document.querySelector(".cart-container");
  _errorMessage = "There are no products added to the cart yet";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerUpdate(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btnMinus = e.target.closest(".quantity-minus");
      const btnPlus = e.target.closest(".quantity-plus");
      const btnClear = e.target.closest(".cart-product__clear");
      if (!btnMinus && !btnPlus && !btnClear) return;
      const product = e.target.closest(".cart-product");
      if (!product) return;
      const id = product.dataset.id;
      const size = product.querySelector(
        ".cart-product__size span"
      ).textContent;
      const productCur = { id: id, size: size };
      if (btnMinus) {
        handler("minus", productCur);
      }
      if (btnPlus) {
        handler("plus", productCur);
      }
      if (btnClear) {
        handler("clear", productCur);
      }
    });
  }

  _generateMarkup() {
    return `${this._data
      .map(
        (product) => `<div  class="cart-product" data-id="${product.id}">
    <a href="singleProduct.html#${product.id}" class="cart-product__left">
        <div class="cart-product__image">
        <img
            src="${product.image}"
            alt="product-image"
        />
        </div>
        <div class="cart-product__content">
            <h4>${product.title}</h4>
            <div class="cart-product__rating">${rating(
              product.rating.rate
            )}</div>
            <p class="cart-product__size">size: <span>${product.size}</span></p>
        </div>
    </a>
    <div class="cart-product__right">
        <p class="cart-product__price">$ ${product.price}</p>
        <div class="cart-product__change-quantity">
            <button class="quantity-minus">
                <i class="fa-solid fa-minus"></i>
            </button>
            <p class="cart-product__quantity">${product.quantity}</p>
            <button class="quantity-plus">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <p class="cart-product__total-price">$ ${
          Math.floor(product.quantity * product.price * 100) / 100
        }</p>
        <button class="cart-product__clear">Clear</button>
    </div>
</div>`
      )
      .join("")}
    
  
  `;
  }
}
export default new CartView();
