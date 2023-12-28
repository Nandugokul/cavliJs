const handleAddItem = (uniqueId) => {
  const button = document.getElementById(uniqueId);
  const quantityButtons = document.getElementById(`qty${uniqueId}`);

  if (button && quantityButtons) {
    button.style.display = "none";
    quantityButtons.style.display = "flex";
  }
};

const updateCounter = (uniqueId, value) => {
  const counterPosition = document.getElementById(`counter${uniqueId}`);
  if (counterPosition) {
    counterPosition.innerText = value;
  }
};
let counter = 5;
let cartItems = [];

const cartItemsPush = (uniqueId, counter) => {
  const existingItemIndex = cartItems.findIndex(
    (item) => item.uniqueId === uniqueId
  );

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity = counter;
  } else {
    cartItems.push({
      uniqueId: uniqueId,
      quantity: counter,
    });
  }
  console.log(cartItems);
};

const deleteCartItem = (uniqueId) => {
  const itemIndex = cartItems.findIndex((item) => item.uniqueId === uniqueId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    console.log(`Item with uniqueId ${uniqueId} has been deleted.`);
  } else {
    console.log(`Item with uniqueId ${uniqueId} not found.`);
  }
};

document.addEventListener("click", function (event) {
  const uniqueId = event.target.getAttribute("data-uniqueid");
  if (event.target.classList.contains("addVarientButton")) {
    handleAddItem(uniqueId);
    cartItemsPush(uniqueId, counter);
  }
  if (event.target.classList.contains("increment") && counter < 10) {
    counter = counter + 1;
    updateCounter(uniqueId, counter);
    cartItemsPush(uniqueId, counter);
  }
  if (event.target.classList.contains("decrement")) {
    if (counter === 5) {
      const button = document.getElementById(uniqueId);
      const quantityButtons = document.getElementById(`qty${uniqueId}`);
      deleteCartItem(uniqueId);
      if (button && quantityButtons) {
        button.style.display = "block";
        quantityButtons.style.display = "none";
      }
    }
    if (counter > 5) {
      counter = counter - 1;
      updateCounter(uniqueId, counter);
      cartItemsPush(uniqueId, counter);
    }
  }
});

const cartClose = () => {
  const cartSection = document.getElementById("cartSection");
  cartSection.style.display = "none";
};
const cartOpen = () => {
  const cartSection = document.getElementById("cartSection");
  cartSection.style.display = "block";
};
const cartCloseIcon = document.getElementById("cartCloseIcon");
cartCloseIcon.addEventListener("click", () => {
  cartClose();
});

const cartOpenIcon = document.getElementById("cartOpenIcon");
cartOpenIcon.addEventListener("click", () => {
  cartOpen();
});

const checkOut = document.getElementById("checkOut");
checkOut.addEventListener("click", () => {
  cartClose();
});

import { updatedData } from "./filterModal.js";
const addToCartButton = document.getElementById("addToCartButton");
addToCartButton.addEventListener("click", async () => {
  let modal = document.getElementById("filterModal");
  modal.style.display = "none";
  let cartItemIds = cartItems.map((item) => item.uniqueId);
  console.log(cartItems);
  console.log(cartItemIds);

  let filteredData = updatedData.filter((item) => {
    if (cartItemIds.includes(item.uniqueId)) {
      const cartItem = cartItems.find(
        (cartItem) => cartItem.uniqueId === item.uniqueId
      );
      item.quantity = cartItem ? cartItem.quantity : 0;
      console.log(item);
      return true;
    }
    return false;
  });

  console.log(filteredData);
  const cartItemsDiv = document.getElementById("cartItemsDiv");

  let cartItemsToBeRendered = filteredData.map((item) => {
    return ` <div class="mt-8">
    <img src="./assets/cavliProductImg.png" alt="" class="w-24">
    <div class="border-black/30 border-y pb-3">
        <div class="flex">
            <h1 class="font-bold text-xl w-1/3 mt-2">Product</h1>
            <h1 class="font-bold text-xl w-1/3 mt-2">Region</h1>
            <h1 class="font-bold text-xl w-1/3 mt-2">Quantity</h1>
        </div>
        <div class="flex">
            <h1 class=" text-lg w-1/3 ">${item.productName}</h1>
            <h1 class=" text-lg w-1/3 ">${item.regionOfTesting}</h1>
            <h1 class=" text-lg w-1/3 ">${item.quantity}</h1>
        </div>
    </div>
        </div>`;
  });
  cartItemsDiv.innerHTML = cartItemsToBeRendered.join("");
  let cartItemsLength = cartItemsToBeRendered.length;

  if (cartItemsLength >= 1) {
    cartOpenIcon.style.display = "flex";
    cartOpenIconNumber.innerText = cartItemsLength;
  }
});
