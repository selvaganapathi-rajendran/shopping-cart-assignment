const products = () => {
  fetch("http://localhost:4000/products", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const addToCart = () => {
  console.log("add to cart");
  fetch("http://localhost:4000/addToCart", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
