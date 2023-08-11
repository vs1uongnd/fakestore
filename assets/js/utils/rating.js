export const rating = (rate) => {
  const amountStarFull = Math.floor(rate);
  const amountStarHalf = rate - amountStarFull < 0.5 ? 0 : 1;
  const amountStarBlank = 5 - amountStarFull - amountStarHalf;

  const markupStarFull = [];
  for (let i = 0; i < amountStarFull; i++) {
    markupStarFull.push('<i class="fa-solid fa-star"></i>');
  }
  const markupStarHalf = [];
  for (let i = 0; i < amountStarHalf; i++) {
    markupStarHalf.push('<i class="fa-solid fa-star-half-stroke"></i>');
  }
  const markupStarBlank = [];
  for (let i = 0; i < amountStarBlank; i++) {
    markupStarBlank.push('<i class="fa-regular fa-star"></i>');
  }
  return `
  <p class='stars'>${[
    ...markupStarFull,
    ...markupStarHalf,
    ...markupStarBlank,
  ].join("")}</p>
  `;
};
