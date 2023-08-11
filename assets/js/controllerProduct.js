import { controlSidebar } from "./View/headerView.js";
import singleProductView from "./View/singleProductView.js";
import * as model from "./model.js";
import { showBtnCartQuantity } from "./View/headerView.js";

const controlGetSingleProduct = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    // render skeleton
    singleProductView.renderSkeleton();
    await model.getSingleProduct(id);
    singleProductView.render(model.state.product);
  } catch (err) {}
};
const controlAddToCart = (product) => {
  model.getCartFromLocalStorage();
  model.addToCart(product);
  showBtnCartQuantity(model.state.cart.length);
};
const init = () => {
  controlSidebar();
  model.getCartFromLocalStorage();
  showBtnCartQuantity(model.state.cart.length);
  singleProductView.addHandlerRender(controlGetSingleProduct);
  singleProductView.addHandlerAddToCart(controlAddToCart);
  singleProductView.addHandlerChangeInput();
};
init();
