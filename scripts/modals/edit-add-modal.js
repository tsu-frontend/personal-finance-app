import { clickOutClose } from "../utilities/clickOutClose.js";
import { validateInput1 } from "../utilities/validateInput1.js";
import { validateInput2 } from "../utilities/validateInput2.js";
import { validateInput3 } from "../utilities/validateInput3.js";
import { openThemeModal } from "./theme-modal.js";
import { themes } from "../constants/themes.js";
import { fetchRequest } from "../api/fetchRequest.js";
import { pageType } from "../utilities/pageType.js";
import { potsFirstInput } from "../utilities/potsFirstInput.js";

function openEditAddModal(modalType, data, modalId = null) {
  const modalData = data.find((modal) => modal.id === modalId);

  let field2Title, firstInput, title, subTitle, modalIdValue, modalName, input2Value, modalTheme, modalColorName, colorAnimation, buttonText;

  const config = {
    pots: {
      edit: {
        title: "Edit Pot",
        subTitle: "If your saving targets change, feel free to update your pots.",
        modalIdValue: modalData?.id,
        modalName: modalData?.name,
        input2Value: modalData?.target,
        modalTheme: modalData?.theme,
        modalColorName: themes[modalData?.theme],
        colorAnimation: "",
        buttonText: "Save Changes",
      },
      add: {
        title: "Add New Pot",
        subTitle: "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
        modalIdValue: "new-modal",
        modalName: "",
        input2Value: "",
        modalTheme: "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
        modalColorName: "Pick a theme",
        colorAnimation: "animate-color",
        buttonText: "Add Pot",
      },
    },
    budgets: {
      edit: {
        title: "Edit Budget",
        subTitle: "As your budgets change, feel free to update your spending limits.",
        modalIdValue: modalData?.id,
        modalName: modalData?.name,
        input2Value: modalData?.target,
        modalTheme: modalData?.theme,
        modalColorName: themes[modalData?.theme],
        colorAnimation: "",
        buttonText: "Save Changes",
      },
      add: {
        title: "Add New Budget",
        subTitle: "Choose a category to set a spending budget. These categories can help you monitor spending.",
        modalIdValue: "new-modal",
        modalName: "",
        input2Value: "",
        modalTheme: "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
        modalColorName: "Pick a theme",
        colorAnimation: "animate-color",
        buttonText: "Add Budget",
      },
    },
  };

  ({ title, subTitle, modalIdValue, modalName, input2Value, modalTheme, modalColorName, colorAnimation, buttonText } = config[pageType][modalType]);

  if (pageType === "pots") {
    field2Title = "Target";
    firstInput = potsFirstInput(modalName);
  } else if (pageType === "budgets") {
    field2Title = "Maximum";
    // natia's part
    firstInput = ``;
  }

  // stop page scrolling in the background
  document.body.classList.add("overflow-hidden");
  // append the modal
  document.body.insertAdjacentHTML(
    "beforeend",
    `
        <div id="edit-add-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
          <div data-id="${modalIdValue}" class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
            <div class="w-full flex justify-between items-center">
              <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">${title}</h1>
              <img data-name="close-button" src="../assets/images/icon-close-modal.svg" class="hover:cursor-pointer w-[25.5px] h-[25.5px]" />
            </div>
            <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">${subTitle}</p>
            <div class="w-full flex flex-col gap-[16px]">
              ${firstInput}
              <div class="w-full flex flex-col gap-[4px]">
                <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">${field2Title}</p>
                <div id="input-2-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                  <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                  <input id="input-2" type="text" placeholder="e.g. 2000" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" value="${input2Value}" />
                </div>
              </div>
              <div class="w-full flex flex-col gap-[4px]">
                <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Theme</p>
                <div id="input-3" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                  <span class="${colorAnimation} w-[16px] h-[16px] rounded-full" style="background: ${modalTheme}"></span>
                  <p class="text-[#201F24] text-[14px] font-normal">${modalColorName}</p>
                  <img src="../assets/images/icon-caret-down.svg" class="ml-auto" />
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

  // logic to handle closing the editAddModal
  const closeButton = document.querySelector('[data-name="close-button"]');
  closeButton.addEventListener("click", () => {
    // declaring editAddModal and the close button
    const editAddModal = document.querySelector("#edit-add-modal");

    // animation
    editAddModal.classList.add("animate-fade-out");
    setTimeout(() => {
      editAddModal.remove();

      // resume page scrolling
      document.body.classList.remove("overflow-hidden");
    }, 200);
  });

  // declaring chosenTheme based on modalType
  let chosenTheme;
  if (modalType === "edit") {
    chosenTheme = modalTheme;
  } else if (modalType === "add") {
    chosenTheme = "";
  }

  const input1 = document.querySelector("#input-1");
  // input1 logic for pots page
  if (pageType === "pots") {
    const charsLeft = 30 - input1.value.length;
    const counter = document.querySelector("#characters-left");
    counter.textContent = `${charsLeft} characters left`;
    input1.addEventListener("input", () => validateInput1());

    // input1 logic for budgets page (if even required)
  } else if (pageType === "budgets") {
    // natia's part
    // if theres any logic that needs to be implemented for the first input, it should be done here
  }

  const input2 = document.querySelector("#input-2");
  input2.addEventListener("input", () => validateInput2());

  const themeButton = document.querySelector("#input-3");
  themeButton.addEventListener("click", () => {
    openThemeModal(chosenTheme, data, (newTheme) => {
      chosenTheme = newTheme;
    });
  });

  // submit logic
  const submitButton = document.querySelector("#submit-button");

  submitButton.addEventListener("click", () => {
    const valid1 = validateInput1(pageType);
    const valid2 = validateInput2();
    const valid3 = validateInput3(chosenTheme);
    const canSubmit = valid1 && valid2 && valid3;
    if (canSubmit) {
      const fetchConfig = {
        pots: {
          add: {
            tableName: "pots",
            method: "POST",
            modalId: null,
            body: {
              id: crypto.randomUUID(),
              name: document.querySelector("#input-1").value,
              target: parseFloat(document.querySelector("#input-2").value),
              total: 0,
              theme: chosenTheme,
            },
          },
          edit: {
            tableName: "pots",
            method: "PATCH",
            modalId,
            body: {
              name: document.querySelector("#input-1").value,
              target: parseFloat(document.querySelector("#input-2").value),
              theme: chosenTheme,
            },
          },
        },

        budgets: {
          add: {
            tableName: "budgets",
            method: "POST",
            modalId: null,
            body: {
              id: crypto.randomUUID(),
              // natia's part
              // category: ...,
              maximum: parseFloat(document.querySelector("#input-2").value),
              theme: chosenTheme,
            },
          },
          edit: {
            tableName: "budgets",
            method: "PATCH",
            modalId,
            body: {
              // natia's part
              // category: ...,
              maximum: parseFloat(document.querySelector("#input-2").value),
              theme: chosenTheme,
            },
          },
        },
      };

      fetchRequest(fetchConfig[pageType][modalType]);
      console.log("fetch");
    }
  });

  // close editAddModal on outside click
  const wrapper = document.querySelector("#edit-add-modal");
  const editAddModal = wrapper.querySelector("div");
  clickOutClose(editAddModal, "animate-fade-out", 200, wrapper);
}

export { openEditAddModal };
