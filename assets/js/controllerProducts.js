import * as model from "./model.js";
import productsView from "./View/productsView.js";
import filterView from "./View/filterView.js";
import sortView from "./View/sortView.js";
import paginationView from "./View/paginationView.js";
import { controlSidebar } from "./View/headerView.js";

const controlGetAllProducts = async () => {
  productsView.renderSkeleton();
  filterView.renderSkeleton();
  sortView.renderSkeleton();
  await model.getAllProducts();
  model.getCategoriesAndRangePrice();
  productsView.render(model.getProductsOnPage());
  paginationView.render({
    amountPages: model.state.allProducts.length,
    pageCurrent: model.state.pageCurrent,
  });
  filterView.render({
    rangePrice: model.state.rangePrice,
    categories: model.state.categories,
  });
  sortView.render(model.state.allProducts.length);
};

const controlFilterProducts = ({ category, priceMax }) => {
  model.filterProducts(category, priceMax);
  productsView.render(model.getProductsOnPage());
  sortView.updateQuantityProducts(model.state.filteredProducts.length);
  paginationView.render({
    amountPages: model.state.filteredProducts.length,
    pageCurrent: model.state.pageCurrent,
  });
};

const controlChangeTypeOfList = (typeList) => {
  productsView.changeTypeOfList(typeList);
};

const controlSortProducts = (sort) => {
  model.sortProducts(sort);
  productsView.render(model.getProductsOnPage());
  paginationView.render({
    amountPages: model.state.filteredProducts.length,
    pageCurrent: model.state.pageCurrent,
  });
};

const controlPagination = (page) => {
  productsView.render(model.getProductsOnPage(page));
  paginationView.render({
    amountPages: model.state.filteredProducts.length,
    pageCurrent: model.state.pageCurrent,
  });
};

const init = () => {
  productsView.addHandlerRender(controlGetAllProducts);
  filterView.addHandlerRender(controlFilterProducts);
  sortView.addHandlerChangeTypeOfList(controlChangeTypeOfList);
  sortView.addHandlerRender(controlSortProducts);
  paginationView.addHandlerRender(controlPagination);
  controlSidebar();
};
init();
