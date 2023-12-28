let updatedData = [];
let dataLoaded;
let filterValues = {
  eSim: null,
  formFactors: null,
  regionOfTesting: null,
};
export { updatedData };
import { dataFetch } from "./homeDataAndRender.js";

const dataSpliting = (dataLoaded) => {
  dataLoaded.forEach((item) => {
    item.products.forEach((product) => {
      product.formFactors.forEach((form) => {
        product.regionOfTesting.forEach((region) => {
          updatedData.push({
            ...product,
            regionOfTesting: region,
            formFactors: form,
            uniqueId: crypto.randomUUID(),
          });
        });
      });
    });
  });
};

async function dataLoading() {
  try {
    dataLoaded = await dataFetch();
    // dataSpliting(dataLoaded);
  } catch (error) {
    console.error("Error loading data:", error);
  }

  function filterArray(dataArray, filterValues) {
    return dataArray.filter((item) => {
      const filterESim =
        filterValues.eSim !== null && filterValues.eSim !== "NO FILTER"
          ? item.eSim === filterValues.eSim
          : true;

      const filterFormFactors =
        filterValues.formFactors !== null &&
        filterValues.formFactors !== "NO FILTER"
          ? item.formFactors === filterValues.formFactors
          : true;

      const filterRegionOfTesting =
        filterValues.regionOfTesting !== null &&
        filterValues.regionOfTesting !== "NO FILTER"
          ? item.regionOfTesting === filterValues.regionOfTesting
          : true;

      return filterESim && filterFormFactors && filterRegionOfTesting;
    });
  }

  const filterChange = document.querySelectorAll(".filterChange");
  filterChange.forEach((item) => {
    const tryFiltering = document.getElementById("tryFiltering");
    item.addEventListener("change", async (e) => {
      filterValues = { ...filterValues, [e.target.name]: e.target.value };
      const filteredArray = filterArray(updatedData, filterValues);
      let filterArrayLength = filteredArray.length;
      console.log(filterArrayLength);
      if (filterArrayLength > 0) {
        tryFiltering.style.display = "none";
      } else if (filterArrayLength === 0) {
        tryFiltering.style.display = "flex";
      }

      const filteredItemstoBeRendered = filteredArray.map((item) => {
        return `<div class="flex mt-4 border-b border-black/10 pb-3 text-center items-center ">
            <div class="w-[20%]">
                <h6>${item.productName}</h6>
            </div>
            <div class="w-[20%]">
                <h6>${item.regionOfTesting}</h6>
            </div>
            <div class="w-[10%]">
                <h6>${item.eSim}</h6>
            </div>
            <div class="w-[25%]">
                <h6>${item.formFactors}</h6>
            </div>
            <div class="w-[25%]  justify-center items-center" id="${item.uniqueId}">
                <button 
                  class="bg-blue-700 text-white font-semibold rounded-2xl px-4 py-1 addVarientButton "
                  data-uniqueid="${item.uniqueId}"
                  
                >
                  ADD VARIANT
                </button>
            </div>
            <div class="w-[25%] justify-center hidden" id="qty${item.uniqueId}">
              <button
                class="bg-blue-700 rounded-tl-xl rounded-bl-xl h-8 w-8 text-white decrement"
                data-uniqueid =${item.uniqueId}
              >
                -
              </button>
              <div class="h-8 w-12 flex items-center justify-center border-black/50 border mx-2" id= "counter${item.uniqueId}">
                5
              </div>
              <button
                class="bg-blue-700 rounded-tr-xl rounded-br-xl h-8 w-8 text-white increment"
                data-uniqueid =${item.uniqueId}
              >
                +
              </button>
            </div>
        </div>`;
      });
      filteredItems.innerHTML = filteredItemstoBeRendered.join("");
    });
  });

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", () => {
    let modal = document.getElementById("filterModal");
    modal.style.display = "none";
  });

  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => {
    const eSim = document.getElementById("eSim");
    const formFactors = document.getElementById("formFactors");
    const regionOfTesting = document.getElementById("regionOfTesting");
    eSim.value = "NO FILTER";
    formFactors.value = "NO FILTER";
    regionOfTesting.value = "NO FILTER";
    filterValues = {
      eSim: null,
      formFactors: null,
      regionOfTesting: null,
    };
    let filteredArray = [];
    filteredItems.innerHTML = filteredArray.join("");
    tryFiltering.style.display = "flex";
  });

  const addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      console.log(category);

      let categorybasedUpdate = dataLoaded.filter(
        (item) => item.category == category
      );
      console.log(categorybasedUpdate);
      updatedData = [];
      dataSpliting(categorybasedUpdate);
      console.log(updatedData);
    });
  });
}
dataLoading();
