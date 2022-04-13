import { updateCartCount } from "./common.js";

const categories = [];
// carousel
// create a carousle
const createCarousel = async () => {
  const banners = await getBanners();
  const carouselDiv = document.getElementById("offer-carousel");
  const bannerContainers = createImage(banners);

  bannerContainers.forEach((banner) => {
    carouselDiv.appendChild(banner);
  });
};

// create an container for an image
const createImage = (banners) => {
  const bannerContainers = [];

  banners.forEach((item, index) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.setAttribute("class", "banner-container");
    div.setAttribute("id", index + 1);
    img.setAttribute("src", item.bannerImageUrl);
    img.setAttribute("alt", item.bannerImageAlt);
    div.appendChild(img);
    bannerContainers.push(div);
  });

  return bannerContainers;
};

// get banners information
const getBanners = async () => {
  const offerBanners = await fetch("http://localhost:4000/banners", {
    method: "GET",
  }).then((response) => response.json());
  return offerBanners;
};

createCarousel(); //to create banner

//categories list
const getCategories = async () => {
  const categories = await fetch("http://localhost:4000/categories", {
    method: "GET",
  }).then((response) => response.json());
  return categories;
};

const createCategoriesList = async () => {
  const categories = await getCategories();
  const categoriesContainer = document.getElementById("categories-list");
  const categorieBlocks = createCategorieBlock(categories);
  categorieBlocks.forEach((item) => {
    categoriesContainer.appendChild(item);
  });
  setCategories(); // to add categories in the local storage
  updateCartCount();
};

const createCategorieBlock = (itemsList) => {
  const categorieBlocks = [];

  itemsList.forEach((item, index) => {
    categories.push({ name: item.name, id: item.id });

    const categorieBlock = document.createElement("div");
    const infoBlock = document.createElement("div");
    const imageBlock = document.createElement("div");
    const categorieHeader = document.createElement("h3");
    const categorieInfo = document.createElement("p");
    const categoriesExploreBtn = document.createElement("button");
    const categorieImg = document.createElement("img");

    categorieBlock.setAttribute("class", "categorie-block");
    infoBlock.setAttribute("class", "description-block");
    imageBlock.setAttribute("class", "img-block");

    //create Description
    categorieHeader.textContent = item.name;
    categorieInfo.textContent = item.description;
    categoriesExploreBtn.setAttribute("class", "btn");
    categoriesExploreBtn.setAttribute("id", item.id);
    categoriesExploreBtn.textContent = `Explore ${item.key}`;
    categoriesExploreBtn.addEventListener("click", (e) => {
      location.href = `./productList.html?name=${item.name}&category=${item.id}`;
    });

    //create Image
    categorieImg.setAttribute("src", item.imageUrl);
    categorieImg.setAttribute("alt", item.key);

    infoBlock.appendChild(categorieHeader);
    infoBlock.appendChild(categorieInfo);
    infoBlock.appendChild(categoriesExploreBtn);

    imageBlock.appendChild(categorieImg);

    if (!(index % 2)) {
      categorieBlock.appendChild(imageBlock);
      categorieBlock.appendChild(infoBlock);
    } else {
      categorieBlock.appendChild(infoBlock);
      categorieBlock.appendChild(imageBlock);
    }

    categorieBlocks.push(categorieBlock);
  });

  return categorieBlocks;
};

createCategoriesList();

const setCategories = () => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

// to set active state of the dots based on the current carousel
const setControlHandler = () => {
  const anchorElements = document.getElementById(
    "carousel-control-dot"
  ).children;
  Array.from(anchorElements).forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      if (anchor.id === e.target.id) {
        anchor.setAttribute("style", "background-color: black;");
      }
      Array.from(anchorElements).forEach((item) => {
        if (item.id !== e.target.id && item.hasAttribute("style")) {
          item.removeAttribute("style");
        }
      });
    });
  });
};

setControlHandler();
