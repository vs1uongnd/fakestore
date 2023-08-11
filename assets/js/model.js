import { API_URL, PRODUCTS_PER_PAGE } from "./utils/constants.js";

export const state = {
  product: {},
  allProducts: [],
  filteredProducts: [],
  rangePrice: [],
  categories: [],
  productsPerPage: PRODUCTS_PER_PAGE,
  pageCurrent: 1,
  cart: [],
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    state.allProducts = data;
    state.filteredProducts = data;
  } catch (err) {
    throw new Error("Sorry, something went wrong");
  }
};

export const getCategoriesAndRangePrice = () => {
  const prices = [];
  const categories = [];
  state.allProducts.forEach((product) => {
    prices.push(product.price);
    categories.push(product.category);
  });
  state.rangePrice = [Math.min(...prices), Math.max(...prices)];
  console.log(state.rangePrice);
  state.categories = [...new Set(categories)];
};

export const filterProducts = (category, priceMax) => {
  console.log(priceMax);
  state.filteredProducts = state.allProducts.filter((product) => {
    if (category === "all") {
      return product.price <= priceMax;
    }
    return product.category === category && product.price <= priceMax;
  });
  console.log(state.filteredProducts);
};

export const sortProducts = (sort = "price-lowest") => {
  console.log(sort);
  switch (sort) {
    case "price-lowest":
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => a.price - b.price
      );
      break;
    case "price-highest":
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => b.price - a.price
      );
      break;
    case "rating-lowest":
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => a.rating.rate - b.rating.rate
      );
      break;
    case "rating-highest":
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
      console.log(state.filteredProducts);
      break;
    // FIXME
    // case "name-a":
    //   state.filteredProducts = state.filteredProducts.sort(
    //     (a, b) => a.title[0] > b.title[0]
    //   );
    //   break;
    // case "name-z":
    //   state.filteredProducts = state.filteredProducts.sort(
    //     (a, b) => b.title[0] < a.title[0]
    //   );
    //   console.log(sort.filteredProducts);
    //   break;
    default:
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => b.price - a.price
      );
  }
};

export const getProductsOnPage = (page = 1) => {
  state.pageCurrent = page;
  return state.filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );
};

export const getSingleProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    state.product = data;
    console.log(data);
  } catch (err) {}
};

export const addToCart = (product) => {
  for (const p of state.cart) {
    if (p.id === product.id && p.size === product.size) {
      p.quantity += product.quantity;
      setCartToLocalStorage();
      return;
    }
  }
  state.cart.push(product);
  setCartToLocalStorage();
};

export const changeCart = (type, product) => {
  const { id, size } = product;
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].id === id && state.cart[i].size === size) {
      if (type === "plus") {
        state.cart[i].quantity++;
      }
      if (type === "minus") {
        state.cart[i].quantity > 1
          ? state.cart[i].quantity--
          : state.cart.splice(i, 1);
      }
      if (type === "clear") {
        console.log("clear");
        state.cart.splice(i, 1);
      }
      setCartToLocalStorage();
      return;
    }
  }
};

export const setCartToLocalStorage = () => {
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const getCartFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return (state.cart = []);
  state.cart = cart;
};
