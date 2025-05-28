import { clickOutClose } from "../functions/clickOutClose.js";
import { appendEditModal } from "./edit-add-modal.js";
// import { appendDeleteModal } from "./modal3.js";

function openOptionsModal() {
  const modalOptionsButton = document.querySelectorAll('[data-name="options-button"]');
  modalOptionsButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // remove any existing modal first (with out animation)
      const existingModal = document.getElementById("options-modal");
      if (existingModal) {
        existingModal.classList.add("animate-close");
        setTimeout(() => {
          if (existingModal && existingModal.parentNode) {
            existingModal.parentNode.removeChild(existingModal);
          }
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
      const modal = btn.querySelector("#options-modal");

      modal.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      // edit button
      const editBtn = modal.querySelector("#edit-button");
      editBtn.addEventListener("click", () => {
        // appendEditModal();
      });

      // delete button
      const deleteBtn = modal.querySelector("#delete-button");
      deleteBtn.addEventListener("click", () => {
        // appendDeleteModal();
      });

      // remove modal with out animation when clicking outside
      clickOutClose(modal, "animate-close", 100);
    });
  });
}
openOptionsModal();

export { openOptionsModal };
