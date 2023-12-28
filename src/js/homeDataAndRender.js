let productCardArray = [];
export { dataFetch };
async function dataFetch() {
  try {
    let response = await fetch("../data.json");

    if (!response.ok) {
      throw "Network response was not ok";
    }

    let data = await response.json();
    productCardArray = data;
    productCardRender();
    return data;
  } catch (err) {
    console.error("Error fetching or parsing data:", err);
  }
}

dataFetch();

function productCardRender() {
  const renderingGrid = document.getElementById("productListRenderingGrid");
  let gridItemsToBeRendered = productCardArray.map((item, index) => {
    return `<div class="bg-white flex flex-col items-center rounded-md p-4">
        <img class="w-1/2" src="./assets/cavliProductImg.png" alt="" />
        <h4 class="text-2xl font-medium my-3">${item.category}</h4>
        <div class="border-blue-700 border-2 rounded-3xl px-3 py-1 text-blue-700">
             ${item.products.length} Products
        </div>
        <div class="bg-blue-700 flex rounded-3xl px-3 py-2 mt-3 cursor-pointer addToCart" data-category="${item.category}" id="openFilterModalButton">
        <img src="assets/cartIcon.svg" alt="" />
        <h6 class="font-bold text-white ml-2">ADD TO CART</h6>
    </div>
    </div>`;
  });

  renderingGrid.innerHTML = gridItemsToBeRendered.join("");

  const addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      handleModalOpen(category);
    });
  });
}

let modalOpenCategory;

const modalCloseIcon = document.getElementById("modalCloseIcon");
modalCloseIcon.addEventListener("click", () => {
  let modal = document.getElementById("filterModal");
  modal.style.display = "none";
});

function handleModalOpen(data) {
  console.log(data);
  let modal = document.getElementById("filterModal");
  let filteringItemCategory = document.getElementById("filteringItemCategory");
  modal.style.display = "block";
  filteringItemCategory.innerText = data;
}
