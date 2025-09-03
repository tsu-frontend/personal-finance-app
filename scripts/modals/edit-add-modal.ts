import { themes } from "../constants/themes.js";
import { ClickOutClose } from "../utilities/clickOutClose.js";
import { ValidateInput1 } from "../utilities/validateInput1.js";
import { ValidateInput2 } from "../utilities/validateInput2.js";
import { ValidateInput3 } from "../utilities/validateInput3.js";
import { ThemeModal } from "./theme-modal.js";
import { CategoryModal } from "./category-modal.js";
import { FetchRequest } from "../api/fetchRequest.js";
import { PotsFirstInput } from "../utilities/potsFirstInput.js";
import { BudgetsFirstInput } from "../utilities/budgetsFirstInput.js";

class EditAddModal {
  static open(
    data: any[],
    modalType: "edit" | "add",
    pageType: string,
    modalId: string | null = null
  ): void {
    const modalData = data.find((modal) => modal.id === modalId);

    let field2Title,
      firstInput,
      modalCategory,
      title,
      subTitle,
      modalIdValue,
      modalName,
      input2Value,
      modalTheme,
      modalColorName,
      colorAnimation,
      buttonText;
    const config = {
      pots: {
        edit: {
          title: "Edit Pot",
          subTitle:
            "If your saving targets change, feel free to update your pots.",
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
          subTitle:
            "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
          modalIdValue: "new-modal",
          modalName: "",
          input2Value: 0,
          modalTheme:
            "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
          modalColorName: "Pick a theme",
          colorAnimation: "animate-color",
          buttonText: "Add Pot",
        },
      },
      budgets: {
        edit: {
          title: "Edit Budget",
          subTitle:
            "As your budgets change, feel free to update your spending limits.",
          modalIdValue: modalData?.id,
          modalName: modalData?.name,
          input2Value: modalData?.maximum,
          modalTheme: modalData?.theme,
          modalColorName: themes[modalData?.theme],
          modalCategory: modalData?.category,
          colorAnimation: "",
          buttonText: "Save Changes",
        },
        add: {
          title: "Add New Budget",
          subTitle:
            "Choose a category to set a spending budget. These categories can help you monitor spending.",
          modalIdValue: "new-modal",
          modalName: "",
          input2Value: 0,
          modalCategory: "Pick a category",
          modalTheme:
            "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
          modalColorName: "Pick a theme",
          colorAnimation: "animate-color",
          buttonText: "Add Budget",
        },
      },
    };

    ({
      title,
      subTitle,
      modalIdValue,
      modalName,
      modalCategory,
      input2Value,
      modalTheme,
      modalColorName,
      colorAnimation,
      buttonText,
    } = config[pageType][modalType]);

    if (pageType === "pots") {
      field2Title = "Target";
      firstInput = PotsFirstInput.render(modalName);
    } else if (pageType === "budgets") {
      field2Title = "Maximum";
      // natia
      firstInput = BudgetsFirstInput.render(modalCategory);
    }
    document.body.classList.add("overflow-hidden");
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="edit-add-modal" class="animate-fade-in z-3 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
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
                  <input id="input-2" type="text" placeholder="e.g. 2000" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" value="${input2Value.toFixed(
                    2
                  )}" />
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
    const closeButton = document.querySelector(
      '[data-name="close-button"]'
    ) as HTMLElement;
    closeButton.addEventListener("click", () => {
      const editAddModal = document.querySelector(
        "#edit-add-modal"
      ) as HTMLElement;
      editAddModal.classList.add("animate-fade-out");
      setTimeout(() => {
        editAddModal.remove();
        document.body.classList.remove("overflow-hidden");
      }, 200);
    });
    let chosenTheme;
    if (modalType === "edit") {
      chosenTheme = modalTheme;
    } else if (modalType === "add") {
      chosenTheme = "";
    }
    const input1 = document.querySelector("#input-1") as HTMLInputElement;
    if (pageType === "pots") {
      const charsLeft = 30 - input1.value.length;
      const counter = document.querySelector("#characters-left") as HTMLElement;
      counter.textContent = `${charsLeft} characters left`;
      input1.addEventListener("input", () => ValidateInput1.validate());
    } else if (pageType === "budgets") {
      input1.addEventListener("click", () => {
        CategoryModal.open(modalCategory, (newCategory: string) => {
          modalCategory = newCategory;
        });
      });
    }
    const input2 = document.querySelector("#input-2") as HTMLInputElement;
    input2.addEventListener("input", () => ValidateInput2.validate());
    const themeButton = document.querySelector("#input-3") as HTMLElement;
    themeButton.addEventListener("click", () => {
      ThemeModal.open(chosenTheme, data, (newTheme: string) => {
        chosenTheme = newTheme;
      });
    });
    const submitButton = document.querySelector(
      "#submit-button"
    ) as HTMLElement;
    submitButton.addEventListener("click", () => {
      const valid1 = ValidateInput1.validate();
      const valid2 = ValidateInput2.validate();
      const valid3 = ValidateInput3.validate(chosenTheme);
      const canSubmit = valid1 && valid2 && valid3;
      if (canSubmit) {
        const fetchConfig = {
          pots: {
            add: {
              tableName: "pots",
              method: "POST" as "POST",
              modalId: null,
              body: {
                id: crypto.randomUUID(),
                name: (document.querySelector("#input-1") as HTMLInputElement)
                  .value,
                target: parseFloat(
                  (document.querySelector("#input-2") as HTMLInputElement).value
                ),
                total: 0,
                theme: chosenTheme,
              },
            },
            edit: {
              tableName: "pots",
              method: "PATCH" as "PATCH",
              modalId,
              body: {
                name: (document.querySelector("#input-1") as HTMLInputElement)
                  .value,
                target: parseFloat(
                  (document.querySelector("#input-2") as HTMLInputElement).value
                ),
                theme: chosenTheme,
              },
            },
          },
          budgets: {
            add: {
              tableName: "budgets",
              method: "POST" as "POST",
              modalId: null,
              body: {
                id: crypto.randomUUID(),
                maximum: parseFloat(
                  (document.querySelector("#input-2") as HTMLInputElement).value
                ),
                theme: chosenTheme,
              },
            },
            edit: {
              tableName: "budgets",
              method: "PATCH" as "PATCH",
              modalId,
              body: {
                maximum: parseFloat(
                  (document.querySelector("#input-2") as HTMLInputElement).value
                ),
                theme: chosenTheme,
              },
            },
          },
        };
        FetchRequest.request(fetchConfig[pageType][modalType]);
        console.log("fetch");
      }
    });
    const wrapper = document.querySelector("#edit-add-modal") as HTMLElement;
    const editAddModal = wrapper.querySelector("div") as HTMLElement;
    ClickOutClose.handle(editAddModal, "animate-fade-out", 200, wrapper);
  }
}

export { EditAddModal };
