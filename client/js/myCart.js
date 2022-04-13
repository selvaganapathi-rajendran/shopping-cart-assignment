import {
  getCartItem,
  updateCartCount,
  calculateTotal,
  onClickHandler,
  getRupees,
} from "./common.js";

// create cart item list
const createCartItemsList = () => {
  const cartItems = getCartItem();
  const cart = document.getElementById("cart");
  if (updateCartCount()) {
    cartItems.forEach((product) => {
      const itemWrapper = document.createElement("div");
      const infoWrapper = document.createElement("div");
      const headerWrapper = document.createElement("div");
      const controlWrapper = document.createElement("div");
      const imageWrapper = document.createElement("div");
      const image = document.createElement("img");
      const itemName = document.createElement("h3");
      const incrementBtn = document.createElement("button");
      const decrementBtn = document.createElement("button");
      const countSpan = document.createElement("span");
      const priceSpan = document.createElement("span");
      const totalSpan = document.createElement("span");

      //item wrapper
      itemWrapper.setAttribute("class", "item-wrapper");

      //image wrapper
      imageWrapper.setAttribute("class", "image-wrapper");
      image.setAttribute("src", product.imageURL);
      image.setAttribute("alt", product.name);

      //info wrapper
      infoWrapper.setAttribute("class", "info-wrapper");

      //header wrapper
      headerWrapper.setAttribute("class", "header-wrapper");
      itemName.textContent = product.name;

      //control wrapper
      controlWrapper.setAttribute("class", "control-wrapper");
      controlWrapper.setAttribute("id", product.id);
      countSpan.setAttribute("class", "count");
      priceSpan.setAttribute("class", "price");
      totalSpan.setAttribute("class", "total");
      countSpan.setAttribute("id", `item-quantity-${product.id}`);
      priceSpan.setAttribute("id", `price-${product.id}`);
      totalSpan.setAttribute("id", `item-total-${product.id}`);
      decrementBtn.setAttribute("id", `decrement-btn-${product.id}`);
      incrementBtn.setAttribute("id", `incemenent-btn-${product.id}`);
      decrementBtn.textContent = "-";
      incrementBtn.textContent = "+";
      decrementBtn.addEventListener("click", (e) => {
        onClickHandler(e, false, true);
        updateItemQuantityAndAmount(
          {
            countId: `item-quantity-${product.id}`,
            totalId: `item-total-${product.id}`,
            priceId: `price-${product.id}`,
            incrementBtnId: `incemenent-btn-${product.id}`,
            decrementBtnId: `decrement-btn-${product.id}`,
          },
          false
        );
      });
      incrementBtn.addEventListener("click", (e) => {
        onClickHandler(e, true, false);
        updateItemQuantityAndAmount(
          {
            countId: `item-quantity-${product.id}`,
            totalId: `item-total-${product.id}`,
            priceId: `price-${product.id}`,
            incrementBtnId: `incemenent-btn-${product.id}`,
            decrementBtnId: `decrement-btn-${product.id}`,
          },
          true
        );
      });
      countSpan.textContent = product.count;
      priceSpan.textContent = `x Rs.${product.price}`;
      totalSpan.textContent = `Rs. ${product.price * product.count}`;

      //append
      imageWrapper.appendChild(image);
      headerWrapper.appendChild(itemName);
      controlWrapper.appendChild(decrementBtn);
      controlWrapper.appendChild(countSpan);
      controlWrapper.appendChild(incrementBtn);
      controlWrapper.appendChild(priceSpan);
      controlWrapper.appendChild(totalSpan);
      infoWrapper.appendChild(headerWrapper);
      infoWrapper.appendChild(controlWrapper);
      itemWrapper.appendChild(imageWrapper);
      itemWrapper.appendChild(infoWrapper);
      cart.appendChild(itemWrapper);
    });

    //checkout
    createCheckoutWrapper();
  }
};

// create checkout button wrapper
const createCheckoutWrapper = () => {
  const checkoutBtnText = document.getElementById("checkout-btn");
  const totalAmount = document.createElement("span");

  totalAmount.setAttribute("class", "total-amount");
  totalAmount.setAttribute("id", "total-checkout-amount");
  totalAmount.textContent = `Rs.${calculateTotal("totalAmount", true)}`;

  //append
  checkoutBtnText.parentNode.insertBefore(
    totalAmount,
    checkoutBtnText.nextSibling
  );
};

// to update the quantity number , item * quantity price, and total checkout amount
const updateItemQuantityAndAmount = (
  { countId, totalId, priceId, incrementBtnId, decrementBtnId },
  add
) => {
  const count = document.getElementById(countId);
  const total = document.getElementById(totalId);
  const price = document.getElementById(priceId);
  const incrementBtn = document.getElementById(incrementBtnId);
  const decrementBtn = document.getElementById(decrementBtnId);

  const totalCheckoutAmount = document.getElementById("total-checkout-amount");

  const qty = getRupees(count);
  const itemAmount = getRupees(total);
  const totalAmount = getRupees(totalCheckoutAmount);
  const itemPrice = getRupees(price);
  if (add) {
    count.textContent = `${qty + 1}`;
    total.textContent = `Rs.${itemAmount + itemPrice}`;
    totalCheckoutAmount.textContent = `Rs.${totalAmount + itemPrice}`;
    decrementBtn.disabled = false;
  } else if (!add && !!(qty - 1)) {
    count.textContent = `${qty - 1}`;
    total.textContent = `Rs.${itemAmount - itemPrice}`;
    totalCheckoutAmount.textContent = `Rs.${totalAmount - itemPrice}`;
  } else if (qty - 1 === 0) {
    count.textContent = `${qty - 1}`;
    total.textContent = `Rs.${itemAmount - itemPrice}`;
    totalCheckoutAmount.textContent = `Rs.${totalAmount - itemPrice}`;
    decrementBtn.disabled = true;
  }
};

createCartItemsList();
