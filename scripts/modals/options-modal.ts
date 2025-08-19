import { ClickOutClose } from "../utilities/clickOutClose.js";
import { EditAddModal } from "./edit-add-modal.js";
import { DeleteModal } from "./delete-modal.js";

class OptionsModal {
  static open(data: any[], modalId: string, btn: HTMLElement, pageType: String): void {
    if (btn.querySelector("#options-modal")) return;
    const existingModal = document.querySelector("#options-modal");
    if (existingModal) {
      existingModal.classList.add("animate-close");
      setTimeout(() => {
        existingModal.remove();
      }, 100);
    }
    console.log(data);
    btn.insertAdjacentHTML(
      "beforeend",
      `<div id="options-modal" class="animate-open z-1 hover:cursor-default flex absolute right-0 top-[36px] bg-[#FFF] py-[12px] px-[20px] rounded-[8px] flex-col gap-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
        <button id="edit-button" class="hover:cursor-pointer text-[#201F24] text-[14px] font-[Public Sans] font-normal leading-[150%] whitespace-nowrap">Edit ${pageType}</button>
        <div class="w-full h-[1px] bg-[#F2F2F2]"></div>
        <button id="delete-button" class="hover:cursor-pointer text-[#C94736] text-[14px] font-[Public Sans] font-normal leading-[150%] whitespace-nowrap">Delete ${pageType}</button>
      </div>`
    );
    const optionsModal = btn.querySelector("#options-modal") as HTMLElement;
    optionsModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    const editBtn = optionsModal.querySelector("#edit-button") as HTMLElement;
    editBtn.addEventListener("click", () => {
      EditAddModal.open("edit", data, modalId);
      optionsModal.classList.add("animate-close");
      setTimeout(() => {
        optionsModal.remove();
      }, 100);
    });
    const deleteBtn = optionsModal.querySelector("#delete-button") as HTMLElement;
    deleteBtn.addEventListener("click", () => {
      DeleteModal.open(data, modalId, "pot");
      optionsModal.classList.add("animate-close");
      setTimeout(() => {
        optionsModal.remove();
      }, 100);
    });
    ClickOutClose.handle(optionsModal, "animate-close", 100);
  }
}

export { OptionsModal };
