import { openOptionsModal } from "./modals/options-modal.js";
import { openEditAddModal } from "./modals/edit-add-modal.js";
import { openWithdrawAddModal } from "./modals/withdraw-add-modal.js";
import { fetchRequest } from "./api/fetchRequest.js";

let pots = [];
let isLoading = false;
const renderPotsData = async () => {
  isLoading = true;

  const fetchConfig = {
    tableName: "pots",
    method: "GET",
    modalId: null,
    body: null,
  };
  pots = (await fetchRequest(fetchConfig)) || [];

  console.log("pots fetched");

  renderPots(pots);
  isLoading = false;
};
renderPotsData();

const newPotBtn = document.querySelector("#new-pot-button");
newPotBtn.addEventListener("click", () => {
  if (isLoading) return;
  openEditAddModal("add", pots);
  console.log("clicked");
});

// render pots into container
function renderPots(pots) {
  const potsContainer = document.querySelector("#pots-container");

  // clear container to avoid duplicates in case of re-rendering pots
  potsContainer.innerHTML = "";

  // check if there are pots
  if (pots.length === 0) {
    // show no pots message if pots array is empty
    potsContainer.innerHTML = `
      <h1 class="absolute inset-0 h-fit border-2 border-dashed border-gray-400 text-center text-3xl text-gray-600 font-medium p-10 rounded-lg shadow-sm">
      You haven’t added any pots yet. Start by creating one!
      </h1>
    `;
  } else {
    // append each pot to the pots container
    pots.forEach((pot) => {
      potsContainer.innerHTML += `
      <div data-id="${pot.id}" data-name="pot" class="h-[317px] xl:h-[303px] bg-[#FFF] rounded-[12px] py-[24px] px-[20px] xl:p-[24px] flex flex-col gap-[32px] flex-1 basis-0 grow-0">
        <div data-name="pot-title" class="w-full h-[24px] items-center flex gap-[16px]">
          <div data-name="pot-theme" class="w-[16px] h-[16px] shrink-0 rounded-full" style="background-color: ${pot.theme}"></div>
          <p data-name="pot-name" class="text-[#201F24] font-[Public Sans] text-[20px] font-bold leading-[120%]">${pot.name}</p>
          <div data-name="options-button" class="ml-auto hover:cursor-pointer relative">
            <img src="../assets/images/icon-ellipsis.svg" class="w-[16px] h-[16px]" />
          </div>
        </div>
        <div data-name="pot-savings-summary" class="w-full h-[114px] flex flex-col justify-around gap-[16px] flex-1">
          <div data-name="pot-total-saved" class="w-full flex items-center justify-between">
            <p class="text-[14px] text-[#696868] font-normal leading-[150%] font-[Public Sans]">Total Saved</p>
            <p data-name="total-saved-amount" class="text-[#201F24] text-[32px] font-[Public Sans] font-bold leading-[120%]">$${pot.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div data-name="pot-percentage" class="flex w-full flex-wrap justify-between gap-[13px]">
            <div data-name="bar" class="w-full h-[8px] rounded-[4px] bg-[#F8F4F0]">
              <div data-name="bar-percentage" class="h-full rounded-[4px]" style="background-color: ${pot.theme}; width: ${(pot.total / pot.target) * 100}%"></div>
            </div>
            <p class="text-[#696868] text-[12px] font-[Public Sans] font-bold leading-[150%]">${((pot.total / pot.target) * 100).toFixed(2)}%</p>
            <p data-name="pot-target" class="text-[#696868] text-[12px] font-[Public Sans] font-normal leading-[150%]">Target of $${pot.target.toLocaleString()}</p>
          </div>
          <div data-name="pot-actions" class="w-full flex gap-[16px]">
            <div data-name="add-money" class="select-none border-1 border-transparent hover:border-[#98908B] hover:bg-[#FFF] hover:cursor-pointer transition-all duration-300 ease bg-[#F8F4F0] rounded-[8px] py-[16px] flex justify-center items-center flex-1">
              <p class="text-[#201F24] text-[14px] font-bold leading-[150%]">+ Add Money</p>
            </div>
            <div data-name="withdraw-money" class="select-none border-1 border-transparent hover:border-1 hover:border-[#98908B] hover:bg-[#FFF] hover:cursor-pointer transition-all duration-300 ease bg-[#F8F4F0] rounded-[8px] py-[16px] flex justify-center items-center flex-1">
              <p class="text-[#201F24] text-[14px] font-bold leading-[150%]">Withdraw</p>
            </div>
          </div>
        </div>
      </div>
    `;
    });
    const optionsButtons = document.querySelectorAll('[data-name="options-button"]');
    const addMoneyButtons = document.querySelectorAll('[data-name="add-money"]');
    const withdrawMoneyButtons = document.querySelectorAll('[data-name="withdraw-money"]');

    optionsButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.closest('[data-name="pot"]').getAttribute("data-id");
        openOptionsModal(pots, modalId, btn);
      });
    });

    addMoneyButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.closest('[data-name="pot"]').getAttribute("data-id");
        openWithdrawAddModal("add", pots, modalId);
      });
    });

    withdrawMoneyButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.closest('[data-name="pot"]').getAttribute("data-id");
        openWithdrawAddModal("withdraw", pots, modalId);
      });
    });
  }
}

export { renderPotsData };
