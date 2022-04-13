import { updateCartCount, onClickHandler } from "./common.js";

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let currentSelectedProductLists = [];
// to get the products
const getProducts = async () => {
  const products = await fetch(`http://localhost:4000/products`, {
    method: "GET",
  }).then((response) => response.json());
  return products;
};

// create a product list
const createProductLists = async () => {
  const products = await getProducts();
  currentSelectedProductLists = mapSelectedProduct(products);
  const parent = document.getElementById("product-list");
  const productBlocks = createProductBlocks(currentSelectedProductLists);
  productBlocks.forEach((productBlock) => {
    parent.appendChild(productBlock);
  });
  updateCartCount();
};

// create a category dropdown
const createCategoriesDropdown = () => {
  const categorieNames = JSON.parse(localStorage.getItem("categories"));
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const select = document.createElement("select");

  //select
  select.setAttribute("name", "categories");
  select.setAttribute("id", "categorie-select");

  // option
  categorieNames &&
    categorieNames.forEach((categorie) => {
      const option = document.createElement("option");
      option.setAttribute("value", categorie.name);
      option.setAttribute("id", categorie.id);

      if (categorie.id === params.category) {
        option.setAttribute("selected", true);
      }

      option.textContent = categorie.name;
      select.appendChild(option);
    });

  categoriesDropdown.appendChild(select);
  const categorieSelect = document.getElementById("categorie-select");
  categorieSelect.addEventListener(
    "change",
    (e) => {
      onChangeHandler(e, categorieNames);
    },
    false
  );

  createProductLists();
};
createCategoriesDropdown();

// on change handler for the select
const onChangeHandler = (e, categorieNames) => {
  const value = categorieNames.filter(
    (item) => item.name === e.target.value
  )[0];
  location.href = `./productList.html?name=${value.name}&category=${value.id}`;
  createProductLists();
};

//filter the products based on the category
const mapSelectedProduct = (products) => {
  return products.filter((item) => {
    if (item.category === params.category) {
      return item;
    }
  });
};

const createProductBlocks = (products) => {
  const productBlocks = [];

  products.forEach((product) => {
    const productWrapper = document.createElement("div");
    const productName = document.createElement("h3");
    const imgBlock = document.createElement("div");
    const image = document.createElement("img");
    const descriptionBlock = document.createElement("div");
    const pWrapper = document.createElement("div");
    const btnWrapper = document.createElement("div");
    const infoPara = document.createElement("p");
    const buyButton = document.createElement("button");

    //product wrapper
    productWrapper.setAttribute("class", "product-wrapper");

    //product name
    productName.setAttribute("class", "name-block");
    productName.textContent = product.name;

    //img block
    imgBlock.setAttribute("class", "image-block");
    image.setAttribute("src", product.imageURL);
    image.setAttribute("alt", product.name);

    //description block
    descriptionBlock.setAttribute("class", "info-block");

    //description paragraph
    pWrapper.setAttribute("class", "description");
    infoPara.textContent = product.description;

    //buy now button
    btnWrapper.setAttribute("class", "buy-btn");
    btnWrapper.setAttribute("id", product.id);
    buyButton.textContent = `Buy Now @ MRP Rs.${product.price}`;
    buyButton.addEventListener("click", (e) => {
      onClickHandler(e, false, false, currentSelectedProductLists);
    });

    // append
    imgBlock.appendChild(image);
    pWrapper.appendChild(infoPara);
    btnWrapper.appendChild(buyButton);
    descriptionBlock.appendChild(pWrapper);
    descriptionBlock.appendChild(btnWrapper);
    productWrapper.appendChild(productName);
    productWrapper.appendChild(imgBlock);
    productWrapper.appendChild(descriptionBlock);

    productBlocks.push(productWrapper);
  });

  return productBlocks;
};
