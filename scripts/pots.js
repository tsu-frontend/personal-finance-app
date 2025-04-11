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
              <button data-name="edit-pot-button" class="hover:cursor-pointer text-[#201F24] text-[14px] font-[Public Sans] font-normal leading-[150%]">Edit Pot</button>
              <div class="w-full h-[1px] bg-[#F2F2F2]"></div>
              <button data-name="delete-pot-button" class="hover:cursor-pointer text-[#C94736] text-[14px] font-[Public Sans] font-normal leading-[150%]">Delete Pot</button>
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
            <p data-name="pot-target" class="text-[#696868] text-[12px] font-[Public Sans] font-normal leading-[150%]">Target of $${pot.target.toLocaleString()}</p>
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

  // loop through all pots
  document.querySelectorAll('[data-name="pot"]').forEach((pot) => {
    const potOptions = pot.querySelector('[data-name="pot-options"]');
    const optionsModal = pot.querySelector('[data-name="pot-options-modal"]');

    potOptions.addEventListener("click", () => {
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
      if (!potOptions.contains(e.target) && !optionsModal.contains(e.target)) {
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

    // const numStr = potTarget.replace(/[^0-9.]/g, "");
    // const result = parseFloat(numStr).toFixed(2);

    // toggle delete modal
    const deleteButton = pot.querySelector('[data-name="delete-pot-button"]');
    deleteButton.addEventListener("click", () => {
      // close all open options modal
      if (!optionsModal.classList.contains("hidden")) {
        optionsModal.classList.add("animate-close");
        setTimeout(() => {
          optionsModal.classList.add("hidden");
          optionsModal.classList.remove("flex", "animate-close");
        }, 100);
      }

      // declaring pot name
      const potName = pot.querySelector('[data-name="pot-name"]').textContent;

      // append delete modal
      pot.insertAdjacentHTML(
        "beforeend",
        `
         <div id="delete-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
           <div class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
             <div class="w-full flex justify-between">
               <h1 class="text-[#201F24] text-[20px] md:text-[32px] not-ital font-bold leading-[120%]">Delete ‘${potName}’?</h1>
               <button data-name="delete-close-button" class="hover:cursor-pointer w-[32px] h-[32px]">
                 <img src="../assets/images/icon-close-modal.svg" />
               </button>
             </div>
             <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
             <button data-name="delete-pot-confirm" class="hover:cursor-pointer hover:bg-[#d46c5e] transition-all duration-300 ease w-full p-[16px] bg-[#C94736] rounded-[8px]">
               <p class="text-[#FFF] text-[14px] font-bold leading-[150%]">Yes, Confirm Deletion</p>
             </button>
             <button data-name="delete-close-button" class="hover:cursor-pointer w-full">
               <p class="text-[#696868] text-[14px] font-normal leading-[150%]">No, I want to go back</p>
             </button>
           </div>
         </div>
        `
      );

      // delete close buttons
      pot.querySelectorAll('[data-name="delete-close-button"]').forEach((btn) => {
        btn.addEventListener("click", () => {
          const deleteModal = pot.querySelector("#delete-modal");
          // animation
          deleteModal.classList.add("animate-fade-out");
          setTimeout(() => {
            deleteModal.remove();
          }, 200);
        });
      });

      // delete pot confirm button
      const delConfirmBtn = pot.querySelector('[data-name="delete-pot-confirm"]');
      delConfirmBtn.addEventListener("click", () => {
        const deleteModal = pot.querySelector("#delete-modal");
        // animation
        deleteModal.classList.add("animate-fade-out");
        setTimeout(() => {
          deleteModal.remove();

          // capture pot position and size, position it absolutely
          const rect = pot.getBoundingClientRect();
          pot.style.position = "absolute";
          pot.style.left = `${rect.left}px`;
          pot.style.top = `${rect.top}px`;
          pot.style.width = `${rect.width}px`;

          // pop animation
          pot.classList.add("animate-pop-out");
          setTimeout(() => {
            pot.remove();
          }, 2000);
        }, 200);
      });
    });

    // toggle edit modal
    const editButton = pot.querySelector('[data-name="edit-pot-button"]');
    editButton.addEventListener("click", () => {
      // close all open options modal
      if (!optionsModal.classList.contains("hidden")) {
        optionsModal.classList.add("animate-close");
        setTimeout(() => {
          optionsModal.classList.add("hidden");
          optionsModal.classList.remove("flex", "animate-close");
        }, 100);
      }

      // declaring pot name
      const potName = pot.querySelector('[data-name="pot-name"]').textContent;
      // declaring pot target
      const getTarget = pot.querySelector('[data-name="pot-target"]').textContent;
      const filerTarget = getTarget.replace(/[^0-9.]/g, "");
      const potTarget = parseFloat(filerTarget).toFixed(2);
      // declaring pot theme
      const getTheme = pot.querySelector('[data-name="pot-theme"]');
      const potTheme = getComputedStyle(getTheme).backgroundColor;

      // append edit modal
      pot.insertAdjacentHTML(
        "beforeend",
        `
          <div id="edit-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
            <div class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
              <div class="w-full flex justify-between">
                <h1 class="text-[#201F24] text-[20px] md:text-[32px] not-ital font-bold leading-[120%]">Edit Pot</h1>
                <button data-name="edit-close-button" class="hover:cursor-pointer w-[32px] h-[32px]">
                  <img src="../assets/images/icon-close-modal.svg" />
                </button>
              </div>
              <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">If your saving targets change, feel free to update your pots.</p>
              <div class="w-full flex flex-col gap-[16px]">
                <!-- 1 -->
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
                  <div type="text" class="w-full px-[12px] h-[48px] flex items-center rounded-[8px] border-1 border-[#98908B]">
                    <input type="text" class="w-full focus:outline-none" value="${potName}" />
                  </div>
                  <p class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right">16 characters left</p>
                </div>

                <!-- 2 -->
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Target</p>
                  <div class="w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                    <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                    <input type="text" class="w-full focus:outline-none" value="${potTarget}" />
                  </div>
                </div>

                <!-- 3 -->
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Color Tag</p>
                  <div class="w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                    <span class="w-[16px] h-[16px] rounded-[50%]" style="background-color: ${potTheme}"></span>
                    <p class="text-[#201F24] text-[14px] font-normal">Green</p>
                  </div>
                </div>

                <!-- btn -->
                <button class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
                  <p class="font-bold text-[#FFF] text-[14px]">Save Changes</p>
                </button>
              </div>
            </div>
          </div>
       `
      );
      // edit close button
      const editCloseBtn = pot.querySelector('[data-name="edit-close-button"]');
      editCloseBtn.addEventListener("click", () => {
        const editModal = pot.querySelector("#edit-modal");
        // animation
        editModal.classList.add("animate-fade-out");
        setTimeout(() => {
          editModal.remove();
        }, 200);
      });
    });
  });

  // ------------------------------
};

// call fetch function
hereWeGoWithAnotherFetchAttempt();
