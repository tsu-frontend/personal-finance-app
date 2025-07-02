import { clickOutClose } from "../utilities/clickOutClose.js";

function openWithdrawAddModal(modalType, data, modalId) {
  const modalData = data.find((modal) => modal.id === modalId);

  let title, subTitle, amountLabel, buttonText;

  const config = {
    withdraw: {
      title: `Withdraw from ‘${modalData.name}’`,
      subTitle: "Enter the amount you want to withdraw from this pot. Withdrawing funds will reduce your progress towards your savings goal.",
      amountLabel: "Amount to Add",
      buttonText: "Confirm Withdrawal",
    },
    add: {
      title: `Add to ‘${modalData.name}’`,
      subTitle: "Enter the amount you want to add to this pot. Adding funds will help you reach your savings target faster.",
      amountLabel: "Amount to Add",
      buttonText: "Confirm Addition",
    },
  };

  ({ title, subTitle, amountLabel, buttonText } = config[modalType]);

  // stop page scrolling in the background
  document.body.classList.add("overflow-hidden");
  // append the modal
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div id="withdraw-add-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
        <div data-id="${modalData.id}" class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
          <div class="w-full flex justify-between items-center">
            <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">${title}</h1>
            <img data-name="close-button" src="../assets/images/icon-close-modal.svg" class="hover:cursor-pointer w-[25.5px] h-[25.5px]" />
          </div>
          <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">${subTitle}</p>
          <div class="w-full flex flex-col gap-[16px]">
            <!-- s1 -->
            <div class="w-full flex flex-col gap-[16px] py-[10.5px]">
              <div class="w-full flex justify-between items-center">
                <p class="text-[#696868] font text-[14px] leading-[150%]">New Amount</p>
                <h1 class="text-[#201F24] font-[700] font text-[32px] leading-[120%]">$${modalData.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h1>
              </div>


              <div class="flex w-full flex-wrap justify-between gap-[13px]">
                <div id="progress-bar" class="w-full h-[8px] rounded-[4px] bg-[#F8F4F0] flex gap-[2px]">
                  <div id="bar-percentage" class="h-full rounded-l-[4px] bg-[#201F24]" style="width: ${(modalData.total / modalData.target) * 100}%"></div>
                  <div id="bar-percentage-difference" class="h-full rounded-r-[4px]"></div>
                </div>
                <p id="target-percentage" class="text-[#C94736] text-[12px] font-[700] leading-[150%]">0%</p>
                <p class="text-[#696868] text-[12px] leading-[150%]">Target of $${modalData.target.toLocaleString()}</p>
              </div>


            </div>
            <!-- s2 -->
            <div class="w-full flex flex-col gap-[4px]">
              <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">${amountLabel}</p>
              <div id="input-2-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                <input id="input-2" type="text" placeholder="Enter amount" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" />
              </div>
            </div>
          </div>
          <button id="submit-button" class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
            <p class="font-bold text-[#FFF] text-[14px]">${buttonText}</p>
          </button>
        </div>
      </div>
    `
  );

  // logic to handle closing the withdrawAddModal
  const closeButton = document.querySelector('[data-name="close-button"]');
  closeButton.addEventListener("click", () => {
    // declaring withdrawAddModal and the close button
    const withdrawAddModal = document.querySelector("#withdraw-add-modal");

    // animation
    withdrawAddModal.classList.add("animate-fade-out");
    setTimeout(() => {
      withdrawAddModal.remove();

      // resume page scrolling
      document.body.classList.remove("overflow-hidden");
    }, 200);
  });

  // close withdrawAddModal on outside click
  const wrapper = document.querySelector("#withdraw-add-modal");
  const withdrawAddModal = wrapper.querySelector("div");
  clickOutClose(withdrawAddModal, "animate-fade-out", 200, wrapper);
}

const e = `

`;

export { openWithdrawAddModal };
