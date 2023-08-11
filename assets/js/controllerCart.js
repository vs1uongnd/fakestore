import * as model from "./model.js";
import cartView from "./View/cartView.js";
import { controlSidebar } from "./View/headerView.js";
import { showBtnCartQuantity } from "./View/headerView.js";

const controlGetCart = () => {
  model.getCartFromLocalStorage();
  cartView.render(model.state.cart);
};

const controlUpdateCart = (type, product) => {
  model.changeCart(type, product);
  console.log(model.state.cart);
  cartView.render(model.state.cart);
  showBtnCartQuantity(model.state.cart.length);
};

const init = function () {
  controlSidebar();
  model.getCartFromLocalStorage();
  showBtnCartQuantity(model.state.cart.length);
  cartView.addHandlerRender(controlGetCart);
  cartView.addHandlerUpdate(controlUpdateCart);
};
init();
