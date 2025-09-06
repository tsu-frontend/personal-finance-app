import type { Pot } from "../pots.js";
import { ClickOutClose } from "../utilities/clickOutClose.js";
import { ValidateInput4 } from "../utilities/validateInput4.js";
import { HandleInputError } from "../utilities/handleInputError.js";

type ModalType = "withdraw" | "add";

class WithdrawAddModal {
  private static updateNewAmountText(newAmount: HTMLElement, modalType: ModalType, modalData: Pot, inputValue: string) {
    const value = modalType === "add" ? Number(modalData.total) + Number(inputValue) : Number(modalData.total) - Number(inputValue);
    newAmount.textContent = `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  }

  static open(modalType: ModalType, data: Pot[], modalId: string): void {
    const modalData = data.find((modal) => modal.id === modalId);
    if (!modalData) return;
    const config = {
      withdraw: {
        title: `Withdraw from ‘${modalData.name}’`,
        subTitle: "Enter the amount you want to withdraw from this pot. Withdrawing funds will reduce your progress towards your savings goal.",
        amountLabel: "Amount to Withdraw",
        buttonText: "Confirm Withdrawal",
        color: "#C94736",
      },
      add: {
        title: `Add to ‘${modalData.name}’`,
        subTitle: "Enter the amount you want to add to this pot. Adding funds will help you reach your savings target faster.",
        amountLabel: "Amount to Add",
        buttonText: "Confirm Addition",
        color: "#277C78",
      },
    };
    const { title, subTitle, amountLabel, buttonText, color } = config[modalType];
    document.body.classList.add("overflow-hidden");
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="withdraw-add-modal" class="animate-fade-in z-3 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
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
                  <h1 id="new-amount" class="text-[#201F24] font-[700] font text-[32px] leading-[120%] transition-all duration-500">$${modalData.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h1>
                </div>
                <div class="flex w-full flex-wrap justify-between gap-[13px]">
                  <div id="progress-bar" class="w-full h-[8px] rounded-[4px] bg-[#F8F4F0] flex gap-[2px]">
                    <div id="bar-percentage" class="h-full rounded-l-[4px] bg-[#201F24] transition-all duration-500" style="width: ${(modalData.total / modalData.target) * 100}%"></div>
                    <div id="bar-percentage-difference" class="h-full w-0 rounded-r-[4px] bg-[${color}] transition-all duration-500"></div>
                  </div>
                  <p id="difference-percentage" class="text-[${color}] text-[12px] font-[700] leading-[150%]">0%</p>
                  <p class="text-[#696868] text-[12px] leading-[150%]">Target of $${modalData.target.toLocaleString()}</p>
                </div>
              </div>
              <!-- s2 -->
              <div class="w-full flex flex-col gap-[4px]">
                <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">${amountLabel}</p>
                <div id="input-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                  <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                  <input id="input" type="text" placeholder="Enter amount" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" />
                </div>
              </div>
            </div>
            <button id="submit-button" class="cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
              <p class="font-bold text-[#FFF] text-[14px]">${buttonText}</p>
            </button>
          </div>
        </div>
      `
    );

    const inputField = document.querySelector("#input") as HTMLInputElement;
    const inputDiv = document.querySelector("#input-div") as HTMLElement;
    const submitButton = document.querySelector("#submit-button") as HTMLButtonElement;
    let inputValue = "";

    inputField.addEventListener("input", () => {
      inputValue = inputField.value;

      const validationOutput = ValidateInput4.validate(inputValue, modalType, modalData);

      const barPercentage = document.querySelector("#bar-percentage") as HTMLElement;
      const barPercentageDifference = document.querySelector("#bar-percentage-difference") as HTMLElement;
      const differencePercentage = document.querySelector("#difference-percentage") as HTMLElement;
      const newAmount = document.querySelector("#new-amount") as HTMLElement;

      HandleInputError.display(inputDiv, validationOutput);
      if (!validationOutput) {
        const difference = parseFloat(((Number(inputValue) / modalData.target) * 100).toString());

        differencePercentage.textContent = `${difference.toFixed(2)}%`;
        barPercentageDifference.style.width = `${difference}%`;
        this.updateNewAmountText(newAmount, modalType, modalData, inputValue);

        if (modalType === "withdraw") {
          barPercentage.style.width = `${(modalData.total / modalData.target) * 100 - difference}%`;
        }

        // amount change animation
        newAmount.style.color = `${color}`;
        setTimeout(() => {
          newAmount.style.color = "#201F24";
        }, 300);
      }
    });

    submitButton.addEventListener("click", () => {
      const validationOutput = ValidateInput4.validate(inputValue, modalType, modalData);

      HandleInputError.display(inputDiv, validationOutput);

      if (!validationOutput) {
        submitButton.disabled = true;
        submitButton.classList.remove("cursor-pointer");
        submitButton.classList.add("opacity-50", "cursor-not-allowed");
        // submit logic... using supabase service manager
      }
    });

    // logic to handle closing the withdrawAddModal
    const closeButton = document.querySelector('[data-name="close-button"]') as HTMLElement;
    closeButton.addEventListener("click", () => {
      // declaring withdrawAddModal and the close button
      const withdrawAddModal = document.querySelector("#withdraw-add-modal") as HTMLElement;

      // animation
      withdrawAddModal.classList.add("animate-fade-out");
      setTimeout(() => {
        withdrawAddModal.remove();

        // resume page scrolling
        document.body.classList.remove("overflow-hidden");
      }, 200);
    });

    // close withdrawAddModal on outside click
    const wrapper = document.querySelector("#withdraw-add-modal") as HTMLElement;
    const withdrawAddModal = wrapper.querySelector("div") as HTMLElement;
    ClickOutClose.handle(withdrawAddModal, "animate-fade-out", 200, wrapper);
  }
}

export { WithdrawAddModal };
