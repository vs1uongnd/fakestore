export const controlSidebar = () => {
  const btnControlSidebar = document.querySelector(".btn-control-sidebar");
  const sideBar = document.querySelector(".side-bar");
  btnControlSidebar.addEventListener("click", () => {
    console.log("clicked");
    btnControlSidebar.classList.toggle("click");
    sideBar.classList.toggle("side-bar-show");
    // header.classList.toggle("header--fixed");
  });
};
export const showBtnCartQuantity = (quantity) => {
  const btnCartQuantity = document.querySelectorAll(".btn-cart__quantity");

  btnCartQuantity.forEach((btn) => {
    btn.style.display = quantity > 0 ? "block" : "none";
    btn.textContent = quantity;
  });
};
