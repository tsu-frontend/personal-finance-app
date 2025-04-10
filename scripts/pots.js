const hereWeGoWithAnotherFetchAttempt = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  const pots = data.pots;
  const potsContainer = document.querySelector("#pots-container");

  // append each pot to the pots container
  pots.forEach((pot) => {
    potsContainer.innerHTML += `
        <div data-name="pot" class="h-[317px] xl:h-[303px] bg-[#FFF] rounded-[12px] py-[24px] px-[20px] xl:p-[24px] flex flex-col gap-[32px] flex-1 basis-0 grow-0">
          <div data-name="pot-title" class="w-full h-[24px] items-center flex gap-[16px]">
            <div data-name="pot-theme" class="w-[16px] h-[16px] shrink-0 rounded-[50%]" style="background-color: ${pot.theme}"></div>
            <p data-name="pot-name" class="text-[#201F24] font-[Public Sans] text-[20px] font-bold leading-[120%]">${pot.name}</p>
            <div data-name="pot-options" class="ml-auto hover:cursor-pointer relative">
              <img src="../assets/images/icon-ellipsis.svg" class="w-[16px] h-[16px]" />
              <div data-name="pot-options-modal" class="animate-open hover:cursor-default hidden absolute right-0 top-[36px] w-[114px] bg-[#FFF] py-[12px] px-[20px] rounded-[8px] flex-col gap-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
                <button data-name="edit-pot" class="hover:cursor-pointer text-[#201F24] text-[14px] font-[Public Sans] font-normal leading-[150%]">Edit Pot</button>
                <div class="w-full h-[1px] bg-[#F2F2F2]"></div>
                <button data-name="delete-pot" class="hover:cursor-pointer text-[#C94736] text-[14px] font-[Public Sans] font-normal leading-[150%]">Delete Pot</button>
              </div>
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
              <p class="text-[#696868] text-[12px] font-[Public Sans] font-normal leading-[150%]">Target of $${pot.target.toLocaleString()}</p>
            </div>
            <div data-name="pot-actions" class="w-full flex gap-[16px]">
              <div data-name="add-money" class="select-none border-1 border-transparent hover:border-[#98908B] hover:bg-[#FFF] hover:cursor-pointer transition-all duration-300 ease bg-[#F8F4F0] rounded-[8px] p-[16px] flex justify-center items-center flex-1">
                <p class="text-[#201F24] text-[14px] font-[Public Sans] font-bold leading-[150%]">+ Add Money</p>
              </div>
              <div data-name="withdraw-money" class="select-none border-1 border-transparent hover:border-1 hover:border-[#98908B] hover:bg-[#FFF] hover:cursor-pointer transition-all duration-300 ease bg-[#F8F4F0] rounded-[8px] p-[16px] flex justify-center items-center flex-1">
                <p class="text-[#201F24] text-[14px] font-[Public Sans] font-bold leading-[150%]">Withdraw</p>
              </div>
            </div>
          </div>
        </div>
        `;
  });

  // loop through all option buttons

  document.querySelectorAll('[data-name="pot-options"]').forEach((btn) => {
    const optionsModal = btn.querySelector('[data-name="pot-options-modal"]');
    const allModals = document.querySelectorAll('[data-type="modal"]');

    btn.addEventListener("click", () => {
      // close other modals
      document.querySelectorAll('[data-name="pot-options-modal"]').forEach((otherModal) => {
        if (otherModal !== optionsModal && otherModal.classList.contains("flex")) {
          otherModal.classList.add("animate-close");
          setTimeout(() => {
            otherModal.classList.add("hidden");
            otherModal.classList.remove("flex", "animate-close");
          }, 100);
        }
      });

      // toggle options modal
      optionsModal.classList.add("animate-close");
      setTimeout(() => {
        optionsModal.classList.toggle("hidden");
        optionsModal.classList.toggle("flex");
        optionsModal.classList.remove("animate-close");
      }, 100);
    });

    // close on outside click but not if on modal
    document.addEventListener("click", (e) => {
      if (!btn.contains(e.target) && !optionsModal.contains(e.target)) {
        if (!optionsModal.classList.contains("hidden")) {
          optionsModal.classList.add("animate-close");
          setTimeout(() => {
            optionsModal.classList.add("hidden");
            optionsModal.classList.remove("flex", "animate-close");
          }, 100);
        }
      }
    });

    // dont close optionsModal if clicked inside
    optionsModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  // toggle delete modal
  const delModal = document.querySelector("#delete-modal");
  document.querySelectorAll('[data-name="delete-pot"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      // close all open options modals
      document.querySelectorAll('[data-name="pot-options-modal"]').forEach((modal) => {
        if (!modal.classList.contains("hidden")) {
          modal.classList.add("animate-close");
          setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex", "animate-close");
          }, 100);
        }
      });
      // show delete modal
      delModal.classList.remove("hidden");
      delModal.classList.add("flex");
    });
  });

  // delete close buttons
  document.querySelectorAll('[data-name="delete-close-button"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      delModal.classList.add("hidden");
      delModal.classList.remove("flex");
    });
  });

  // toggle edit modal
  const editModal = document.querySelector("#edit-modal");
  document.querySelectorAll('[data-name="edit-pot"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      // close all open options modals
      document.querySelectorAll('[data-name="pot-options-modal"]').forEach((modal) => {
        if (!modal.classList.contains("hidden")) {
          modal.classList.add("animate-close");
          setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex", "animate-close");
          }, 100);
        }
      });
      // show edit modal
      editModal.classList.remove("hidden");
      editModal.classList.add("flex");
    });
  });
  // edit close buttons
  document.querySelectorAll('[data-name="edit-close-button"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      editModal.classList.add("hidden");
      editModal.classList.remove("flex");
    });
  });
};

// call fetch function
hereWeGoWithAnotherFetchAttempt();
