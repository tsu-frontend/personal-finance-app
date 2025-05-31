import { clickOutClose } from "../functions/clickOutClose.js";
import { deleteFetch } from "../functions/deleteFetch.js";

const data = JSON.parse(localStorage.getItem("data") || "[]");

function openDeleteModal(modalId) {
  const modalData = data.find((modal) => modal.id === modalId);

  // stop page scrolling in the background
  document.body.classList.add("overflow-hidden");

  document.body.insertAdjacentHTML(
    "beforeend",
    `
         <div id="wrapper" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
           <div id="delete-modal" class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
             <div class="w-full flex justify-between">
               <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">Delete ‘${modalData.name}’?</h1>
               <button id="delete-close-button" class="hover:cursor-pointer w-[32px] h-[32px]">
                 <img src="../assets/images/icon-close-modal.svg" />
               </button>
             </div>
             <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
             <button id="delete-confirm-button" class="hover:cursor-pointer hover:bg-[#d46c5e] transition-all duration-300 ease w-full p-[16px] bg-[#C94736] rounded-[8px]">
               <p class="text-[#FFF] text-[14px] font-bold leading-[150%]">Yes, Confirm Deletion</p>
             </button>
             <button id="delete-close-button" class="hover:cursor-pointer w-full">
               <p class="text-[#696868] text-[14px] font-normal leading-[150%]">No, I want to go back</p>
             </button>
           </div>
         </div>
        `
  );

  const wrapper = document.querySelector("#wrapper");
  const deleteModal = document.querySelector("#delete-modal");
  const delConfirmBtn = document.querySelector("#delete-confirm-button");

  clickOutClose(deleteModal, "animate-fade-out", 200, wrapper);

  document.querySelectorAll("#delete-close-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      wrapper.classList.add("animate-fade-out");
      setTimeout(() => {
        wrapper.remove();
        document.body.classList.remove("overflow-hidden");
      }, 200);
    });
  });

  delConfirmBtn.addEventListener("click", () => {
    wrapper.classList.add("animate-fade-out");
    setTimeout(() => {
      wrapper.remove();
      document.body.classList.remove("overflow-hidden");
    }, 200);

    // delete animation goes here
    deleteFetch(modalId);
  });

  // resume page scrolling
  // document.body.classList.remove("overflow-hidden");
}

export { openDeleteModal };

// setTimeout(() => {
//   deleteModal.remove();
//   document.body.classList.remove("overflow-hidden");
//   const rect = pot.getBoundingClientRect();
//   pot.style.position = "fixed";
//   pot.style.left = `${rect.left}px`;
//   pot.style.top = `${rect.top}px`;
//   pot.style.width = `${rect.width}px`;
//   pot.classList.add("animate-pop-out");
//   setTimeout(() => {
//     pot.remove();
//   }, 2000);
// }, 200);
