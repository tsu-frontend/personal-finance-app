import { clickOutClose } from "../utilities/clickOutClose.js";
import { openEditAddModal } from "./edit-add-modal.js";
import { openDeleteModal } from "./delete-modal.js";

function openOptionsModal(data, modalId, btn) {
  // if modal already exists, do not open it again, let clickOutClose close it
  if (btn.querySelector("#options-modal")) return;

  // remove any existing modal first (with out animation)
  const existingModal = document.querySelector("#options-modal");
  if (existingModal) {
    existingModal.classList.add("animate-close");
    setTimeout(() => {
      existingModal.remove();
    }, 100);
  }

  // insert modal
  btn.insertAdjacentHTML(
    "beforeend",
    `
          <div id="options-modal" class="animate-open hover:cursor-default flex absolute right-0 top-[36px] w-[114px] bg-[#FFF] py-[12px] px-[20px] rounded-[8px] flex-col gap-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
            <button id="edit-button" class="hover:cursor-pointer text-[#201F24] text-[14px] font-[Public Sans] font-normal leading-[150%]">Edit Pot</button>
            <div class="w-full h-[1px] bg-[#F2F2F2]"></div>
            <button id="delete-button" class="hover:cursor-pointer text-[#C94736] text-[14px] font-[Public Sans] font-normal leading-[150%]">Delete Pot</button>
          </div>
        `
  );
  const optionsModal = btn.querySelector("#options-modal");

  optionsModal.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  // edit button
  const editBtn = optionsModal.querySelector("#edit-button");
  editBtn.addEventListener("click", () => {
    openEditAddModal("edit", data, modalId, "pot");
    optionsModal.classList.add("animate-close");
    setTimeout(() => {
      optionsModal.remove();
    }, 100);
  });

  // delete button
  const deleteBtn = optionsModal.querySelector("#delete-button");
  deleteBtn.addEventListener("click", () => {
    openDeleteModal(data, modalId);
    optionsModal.classList.add("animate-close");
    setTimeout(() => {
      optionsModal.remove();
    }, 100);
  });

  // remove modal with out animation when clicking outside
  clickOutClose(optionsModal, "animate-close", 100);
}

export { openOptionsModal };
