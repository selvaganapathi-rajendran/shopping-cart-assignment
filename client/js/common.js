export const updateCartCount = () => {
  const count = calculateTotal("count");

  const ele = document.getElementById("nav-cart-count");
  const itemCount = document.getElementById("item-count");
  const shoppingBlock = document.getElementById("footer-shopping-block");
  const emptySectionCart = document.getElementById("empty-cart");
  const cartListSection = document.getElementById("cart-list-section");
  const cartFooter = document.getElementById("checkout-block");

  if (count) {
    ele.textContent = `${count} Items`;
    if (itemCount && cartFooter) {
      itemCount.textContent = `My Cart (${count} Items)`;
      cartFooter.setAttribute("style", "display: block;");
    }

    if (cartListSection && emptySectionCart && shoppingBlock) {
      cartListSection.setAttribute("style", "display: block;");
      emptySectionCart.setAttribute("style", "display: none");
      shoppingBlock.setAttribute("style", "display: none");
    }

    return count;
  } else {
    ele.textContent = `0 Items`;

    if (cartListSection && cartFooter && emptySectionCart && shoppingBlock) {
      cartListSection.setAttribute("style", "display: none;");
      cartFooter.setAttribute("style", "display: none;");
      emptySectionCart.setAttribute("style", "display: block;");
      shoppingBlock.setAttribute("style", "display: block;");
    }

    localStorage.removeItem("cart-items");

    return 0;
  }
};

export const getCartItem = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart-items"));
  return cartItems;
};

export const calculateTotal = (key) => {
  const cartItems = getCartItem();
  let total = 0;
  if (cartItems) {
    total = cartItems.reduce((prevsVal, curval) => {
      return prevsVal + curval[key];
    }, 0);
    return total;
  }
};

export const checkExistingCartItem = (e, cartItems) => {
  const isExist = cartItems.filter(
    (item) => item.id === e.target.parentNode.id
  );
  return !!isExist.length;
};

// update the existing cart item count
export const updateCartItem = (e, cartItems, plus, minus) => {
  const updatedCartItems = cartItems.map((item) => {
    if (item.id === e.target.parentNode.id) {
      return {
        ...item,
        count:
          !plus && !minus
            ? item.count + 1
            : plus
            ? item.count + 1
            : item.count - 1,
        totalAmount:
          !plus && !minus
            ? (item.count + 1) * item.price
            : plus
            ? (item.count + 1) * item.price
            : (item.count - 1) * item.price,
      };
    } else {
      return item;
    }
  });
  localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
};

// add the items to the cart and store it in the local storage
export const addCartItem = (e, cartItems, currentSelectedProductLists) => {
  if (currentSelectedProductLists) {
    const product = currentSelectedProductLists.filter((item) => {
      if (item.id === e.target.parentNode.id) {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          imageURL: item.imageURL,
        };
      }
    })[0];

    localStorage.setItem(
      "cart-items",
      JSON.stringify([
        ...(cartItems ? cartItems : []),
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageURL: product.imageURL,
          count: 1,
          totalAmount: product.price,
        },
      ])
    );
  }
};

//onclick handler to update the cart count
export const onClickHandler = (
  e,
  plus = false,
  minus = false,
  currentSelectedProductLists = null
) => {
  const cartItems = getCartItem();

  if (cartItems && checkExistingCartItem(e, cartItems)) {
    updateCartItem(e, cartItems, plus, minus);
  } else {
    addCartItem(e, cartItems, currentSelectedProductLists);
  }

  updateCartCount();
};

// get the rupees from the text content
export const getRupees = (element) => {
  const rupees = element.textContent.split(/[.;+_]/).pop();
  return +rupees;
};
