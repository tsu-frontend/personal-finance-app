let pots = [];

// declaring pot theme colors
const colors = {
  "#277C78": "Green",
  "#F2CDAC": "Yellow",
  "#82C9D7": "Cyan",
  "#626070": "Navy",
  "#C94736": "Red",
  "#826CB0": "Purple",
  "#597C7C": "Turquoise",
  "#93674F": "Brown",
  "#934F6F": "Magenta",
  "#3F82B2": "Blue",
  "#97A0AC": "Navy Grey",
  "#7F9161": "Army Green",
  "#f72d93": "Pink",
  "#CAB361": "Gold",
  "#BE6C49": "Orange",
};

// mapping color names to their respective dom element ids
const colorIds = {
  Green: "green",
  Yellow: "yellow",
  Cyan: "cyan",
  Navy: "navy",
  Red: "red",
  Purple: "purple",
  Turquoise: "turquoise",
  Brown: "brown",
  Magenta: "magenta",
  Blue: "blue",
  "Navy Grey": "navyGrey",
  "Army Green": "armyGreen",
  Pink: "pink",
  Gold: "gold",
  Orange: "orange",
};

const renderPotsData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();
  pots = data.pots;

  renderPots(pots);
  initPotEvents();
};
renderPotsData();

// render pots into container
const renderPots = (pots) => {
  const potsContainer = document.querySelector("#pots-container");

  // clear container to avoid duplicates in case of re-rendering pots
  potsContainer.innerHTML = "";

  // check if there are pots
  if (pots.length === 0) {
    // show no pots message if pots array is empty
    potsContainer.innerHTML = `
      <h1 class="absolute inset-0 h-fit border-2 border-dashed border-gray-400 text-center text-3xl text-gray-600 font-medium p-10 rounded-lg shadow-sm">
      You haven’t added any pots yet. Start by creating one!
      </h1>
    `;
  } else {
    // append each pot to the pots container
    pots.forEach((pot) => {
      potsContainer.innerHTML += `
      <div data-id="${pot.id}" data-name="pot" class="h-[317px] xl:h-[303px] bg-[#FFF] rounded-[12px] py-[24px] px-[20px] xl:p-[24px] flex flex-col gap-[32px] flex-1 basis-0 grow-0">
        <div data-name="pot-title" class="w-full h-[24px] items-center flex gap-[16px]">
          <div data-name="pot-theme" class="w-[16px] h-[16px] shrink-0 rounded-full" style="background-color: ${pot.theme}"></div>
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
            <div data-name="add-money" class="select-none border-1 border-transparent hover:border-[#98908B] hover:bg-[#FFF] hover:cursor-pointer transition-all duration-300 ease bg-[#F8F4F0] rounded-[8px] py-[16px] flex justify-center items-center flex-1">
              <p class="text-[#201F24] text-[14px] font-bold leading-[150%]">+ Add Money</p>
            </div>
            <div data-name="withdraw-money" class="select-none border-1 border-transparent hover:border-1 hover:border-[#98908B] hover:bg-[#FFF] hover:cursor-pointer transition-all duration-300 ease bg-[#F8F4F0] rounded-[8px] py-[16px] flex justify-center items-center flex-1">
              <p class="text-[#201F24] text-[14px] font-bold leading-[150%]">Withdraw</p>
            </div>
          </div>
        </div>
      </div>
    `;
    });
  }
};

// initialize event listeners for pot actions (e.g. edit, delete)
const initPotEvents = () => {
  // loop through all pots
  document.querySelectorAll('[data-name="pot"]').forEach((pot) => {
    const potOptions = pot.querySelector('[data-name="pot-options"]');
    const optionsModal = pot.querySelector('[data-name="pot-options-modal"]');

    // get pot name and find the corresponding data from the pots array
    let potId = pot.getAttribute("data-id");
    const potData = pots.find((item) => item.id === potId);

    potOptions.addEventListener("click", () => {
      // toggle options modal
      optionsModal.classList.add("animate-close");
      setTimeout(() => {
        optionsModal.classList.toggle("hidden");
        optionsModal.classList.toggle("flex");
        optionsModal.classList.remove("animate-close");
      }, 100);
    });

    // close options modal on outside click
    document.addEventListener("click", () => {
      if (optionsModal.classList.contains("flex")) {
        optionsModal.classList.add("animate-close");
        setTimeout(() => {
          optionsModal.classList.add("hidden");
          optionsModal.classList.remove("flex", "animate-close");
        }, 100);
      }
    });

    // dont close options modal if clicked inside
    optionsModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // toggle delete modal
    const deleteButton = pot.querySelector('[data-name="delete-pot-button"]');
    deleteButton.addEventListener("click", () => {
      if (!optionsModal.classList.contains("hidden")) {
        // animation
        optionsModal.classList.add("animate-close");
        setTimeout(() => {
          optionsModal.classList.add("hidden");
          optionsModal.classList.remove("flex", "animate-close");
        }, 100);
      }

      // stop page scrolling in the background
      document.body.classList.add("overflow-hidden");

      // declaring pot name
      let potName = potData.name;

      // append delete modal
      pot.insertAdjacentHTML(
        "beforeend",
        `
         <div id="delete-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
           <div class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
             <div class="w-full flex justify-between">
               <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">Delete ‘${potName}’?</h1>
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

            // resume page scrolling
            document.body.classList.remove("overflow-hidden");
          }, 200);
        });
      });

      // delete pot confirm
      const delConfirmBtn = pot.querySelector('[data-name="delete-pot-confirm"]');
      delConfirmBtn.addEventListener("click", () => {
        const deleteModal = pot.querySelector("#delete-modal");
        // animation
        deleteModal.classList.add("animate-fade-out");
        setTimeout(() => {
          deleteModal.remove();

          // resume page scrolling
          document.body.classList.remove("overflow-hidden");

          // capture pot position and size, position it absolutely
          const rect = pot.getBoundingClientRect();
          pot.style.position = "fixed";
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
      if (!optionsModal.classList.contains("hidden")) {
        // animation
        optionsModal.classList.add("animate-close");
        setTimeout(() => {
          optionsModal.classList.add("hidden");
          optionsModal.classList.remove("flex", "animate-close");
        }, 100);
      }

      // stop page scrolling in the background
      document.body.classList.add("overflow-hidden");

      // declaring pot information
      let potName = potData.name;
      let potTarget = potData.target.toLocaleString("en-US", { minimumFractionDigits: 2 });
      let potTheme = potData.theme;
      let potColorName = colors[potData.theme];

      // append edit modal
      pot.insertAdjacentHTML(
        "beforeend",
        `
          <div id="edit-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
            <div class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">Edit Pot</h1>
                <img data-name="edit-close-button" src="../assets/images/icon-close-modal.svg" class="hover:cursor-pointer w-[25.5px] h-[25.5px]" />
              </div>
              <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">If your saving targets change, feel free to update your pots.</p>
              <div class="w-full flex flex-col gap-[16px]">
                <!-- 1 -->
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
                  <div id="pot-name-div" class="w-full px-[20px] py-[12px] flex items-center rounded-[8px] border-1 border-[#98908B] relative">
                   <input id="pot-name-input" type="text" class="hover:cursor-pointer h-[21px] w-full relative focus:outline-none" value="${potName}" />
                  </div>
                  <p id="characters-left" class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right"></p>
                </div>
                <!-- 2 -->
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Target</p>
                  <div id="pot-target-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                    <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                    <input id="pot-target-input" type="text" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" value="${potTarget}" />
                  </div>
                </div>
                <!-- 3 -->
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Theme</p>
                  <div id="theme-button" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                    <span class="w-[16px] h-[16px] rounded-full" style="background-color: ${potTheme}"></span>
                    <p class="text-[#201F24] text-[14px] font-normal">${potColorName}</p>
                    <img src="../assets/images/icon-caret-down.svg" class="ml-auto" />
                    <div id="theme-modal-wrapper" class="animate-theme-open cursor-auto hidden max-h-[300px] [@media(900px>=height)]:max-h-[200px] [&::-webkit-scrollbar]:hidden overflow-y-auto rounded-[8px] bg-[#FFF] absolute left-[-1px] top-[64px] w-[calc(100%+2px)] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
                    <div id="theme-modal" class="h-full [@media(700px>=height)]:h-[100px] w-full flex flex-col px-[20px]">
                      <!-- 1 -->
                      <div id="green" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#277C78] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Green</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 2 -->
                      <div id="yellow" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#F2CDAC] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Yellow</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 3 -->
                      <div id="cyan" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#82C9D7] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Cyan</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 4 -->
                      <div id="navy" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#626070] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Navy</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 5 -->
                      <div id="red" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#C94736] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Red</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 6 -->
                      <div id="purple" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#826CB0] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Purple</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 7 -->
                      <div id="turquoise" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#597C7C] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Turquoise</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 8 -->
                      <div id="brown" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#93674F] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Brown</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 9 -->
                      <div id="magenta" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#934F6F] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Magenta</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 10 -->
                      <div id="blue" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#3F82B2] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Blue</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 11 -->
                      <div id="navyGrey" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#97A0AC] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Navy Grey</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 12 -->
                      <div id="armyGreen" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#7F9161] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Army Green</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 13 -->
                      <div id="pink" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#f72d93] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Pink</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 14 -->
                      <div id="gold" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#CAB361] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Gold</p>
                      </div>

                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <!-- 15 -->
                      <div id="orange" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#BE6C49] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Orange</p>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- btn -->
              <button id="save-changes-button" class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
                <p class="font-bold text-[#FFF] text-[14px]">Save Changes</p>
              </button>
            </div>
          </div>
       `
      );

      // declare nameInput, targetInput, counter, and div elements
      const nameInput = document.querySelector("#pot-name-input");
      const counter = document.querySelector("#characters-left");
      const nameInputDiv = document.querySelector("#pot-name-div");
      const targetInput = document.querySelector("#pot-target-input");
      const targetInputDiv = document.querySelector("#pot-target-div");

      // update character count and border color
      const updateNameCounter = () => {
        const charsLeft = 30 - nameInput.value.length;

        // display "Too long!" if character count is below 0, else show remaining characters
        if (charsLeft < 0) {
          counter.textContent = "Too long!";
        } else {
          counter.textContent = `${charsLeft} characters left`;
        }

        // change border color to red if input too long, else keep it default
        nameInputDiv.style.borderColor = charsLeft < 0 ? "red" : "#98908B";
      };

      // reset target input border color to default
      const updateTargetBorder = () => {
        targetInputDiv.style.borderColor = "#98908B";
      };

      // listen for input changes and trigger their specific update funcs
      nameInput.addEventListener("input", updateNameCounter);
      targetInput.addEventListener("input", updateTargetBorder);

      updateNameCounter();
      updateTargetBorder();

      // get the corresponding color id from the colorIds map
      const themeId = colorIds[potColorName];
      let selectedTheme = document.getElementById(themeId);

      // append the selected theme icon to the corresponding pot theme
      if (selectedTheme) {
        selectedTheme.innerHTML += `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;
        selectedTheme.classList.remove("hover:cursor-pointer");
        selectedTheme.classList.add("hover:cursor-not-allowed");
      }

      const themes = document.querySelector("#theme-modal").children;

      // loop through each theme option
      Array.from(themes).forEach((theme) => {
        theme.addEventListener("click", () => {
          // ignore click if theme already used or selected
          if (theme.querySelector("#alreadyUsed") || theme.querySelector("#selectedTheme")) return;

          // get theme name from id, then get both name and hex color
          const chosenThemeName = Object.entries(colorIds).find(([k, v]) => v === theme.id)?.[0];
          const chosenTheme = Object.keys(colors).find((hex) => colors[hex] === chosenThemeName);

          // remove previously selected theme's icon and re-enable hover cursor
          document.querySelector("#selectedTheme").remove();
          selectedTheme.classList.add("hover:cursor-pointer");
          selectedTheme.classList.remove("hover:cursor-not-allowed");
          // mark new selected theme
          selectedTheme = theme;
          selectedTheme.innerHTML += `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;

          // update theme color and label text
          themeButton.querySelector("span").style.backgroundColor = chosenTheme;
          themeButton.querySelector("p").textContent = chosenThemeName;

          // close theme modal after theme is selected
          themeModal.classList.add("animate-theme-close");
          setTimeout(() => {
            themeModal.classList.add("hidden");
            themeModal.classList.remove("animate-theme-close");

            // disable pointer cursor on selected theme to indicate its not clickable when theme modal closes
            selectedTheme.classList.remove("hover:cursor-pointer");
            selectedTheme.classList.add("hover:cursor-not-allowed");
          }, 300);
        });
      });

      // loop through each pot to check if its theme is already used
      pots.forEach((pot) => {
        // get the used theme name and corresponding dom element id
        const usedTheme = colors[pot.theme];
        const usedThemeElementId = colorIds[usedTheme];
        const usedThemeElement = document.getElementById(usedThemeElementId);

        // check if the used theme element id doesnt match the current themeId
        if (usedThemeElementId !== themeId) {
          // add already used message to the theme element
          usedThemeElement.innerHTML += `<p id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;
          usedThemeElement.classList.remove("hover:cursor-pointer");
          usedThemeElement.classList.add("hover:cursor-not-allowed");
        }
      });

      const editModal = pot.querySelector("#edit-modal");
      const editCloseBtn = pot.querySelector('[data-name="edit-close-button"]');

      // edit close button
      editCloseBtn.addEventListener("click", () => {
        // animation
        editModal.classList.add("animate-fade-out");
        setTimeout(() => {
          editModal.remove();

          // resume page scrolling
          document.body.classList.remove("overflow-hidden");
        }, 200);
      });

      const themeButton = editModal.querySelector("#theme-button");
      const themeModal = editModal.querySelector("#theme-modal-wrapper");

      // toggle theme modal
      themeButton.addEventListener("click", () => {
        if (!themeModal.classList.contains("hidden")) {
          // animation
          themeModal.classList.add("animate-theme-close");
          setTimeout(() => {
            themeModal.classList.add("hidden");
            themeModal.classList.remove("animate-theme-close");
          }, 300);
        } else {
          themeModal.classList.remove("hidden");
        }
      });

      // close theme modal on outside click
      document.addEventListener("click", (e) => {
        if (!themeButton.contains(e.target) && !themeModal.contains(e.target)) {
          if (!themeModal.classList.contains("hidden")) {
            // animation
            themeModal.classList.add("animate-theme-close");
            setTimeout(() => {
              themeModal.classList.add("hidden");
              themeModal.classList.remove("animate-theme-close");
            }, 300);
          }
        }
      });

      // dont close theme modal if clicked inside
      themeModal.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  });
};

// add new pot
const addNewPot = () => {
  const newPotButton = document.querySelector("#new-pot-button");

  newPotButton.addEventListener("click", () => {
    // stop page scrolling in the background
    document.body.classList.add("overflow-hidden");

    // append add new pot modal
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="new-pot-modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
          <div class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
            <div class="w-full flex justify-between items-center">
              <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">Add New Pot</h1>
              <img data-name="new-pot-close-button" src="../assets/images/icon-close-modal.svg" class="hover:cursor-pointer w-[25.5px] h-[25.5px]" />
            </div>
            <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
            <div class="w-full flex flex-col gap-[16px]">
              <!-- 1 -->
              <div class="w-full flex flex-col gap-[4px]">
                <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
                <div id="pot-name-div" class="w-full px-[20px] py-[12px] h-[48px] flex items-center rounded-[8px] border-1 border-[#98908B] relative">
                 <input id="pot-name-input" type="text" placeholder="e.g. Rainy Days" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" />
                </div>
                <p id="characters-left" class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right"></p>
              </div>
              <!-- 2 -->
              <div class="w-full flex flex-col gap-[4px]">
                <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Target</p>
                <div id="pot-target-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                  <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                  <input id="pot-target-input" type="text" placeholder="e.g. 2000" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" />
                </div>
              </div>
              <!-- 3 -->
              <div class="w-full flex flex-col gap-[4px]">
                <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Theme</p>
                <div id="theme-button" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                    <span class="animate-color w-[16px] h-[16px] rounded-full" style="background: conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)"></span>
                    <p class="text-[#201F24] text-[14px] font-normal">Pick a theme</p>
                  <img src="../assets/images/icon-caret-down.svg" class="ml-auto" />
                  <div id="theme-modal-wrapper" class="animate-theme-open cursor-auto hidden max-h-[300px] [@media(900px>=height)]:max-h-[200px] [&::-webkit-scrollbar]:hidden overflow-y-auto rounded-[8px] bg-[#FFF] absolute left-[-1px] top-[64px] w-[calc(100%+2px)] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
                  <div id="theme-modal" class="h-full [@media(700px>=height)]:h-[100px] w-full flex flex-col px-[20px]">
                    <!-- 1 -->
                    <div id="green" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#277C78] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Green</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 2 -->
                    <div id="yellow" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#F2CDAC] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Yellow</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 3 -->
                    <div id="cyan" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#82C9D7] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Cyan</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 4 -->
                    <div id="navy" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#626070] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Navy</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 5 -->
                    <div id="red" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#C94736] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Red</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 6 -->
                    <div id="purple" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#826CB0] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Purple</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 7 -->
                    <div id="turquoise" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#597C7C] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Turquoise</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 8 -->
                    <div id="brown" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#93674F] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Brown</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 9 -->
                    <div id="magenta" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#934F6F] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Magenta</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 10 -->
                    <div id="blue" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#3F82B2] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Blue</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 11 -->
                    <div id="navyGrey" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#97A0AC] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Navy Grey</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 12 -->
                    <div id="armyGreen" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#7F9161] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Army Green</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 13 -->
                    <div id="pink" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#f72d93] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Pink</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 14 -->
                    <div id="gold" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#CAB361] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Gold</p>
                    </div>

                    <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                    <!-- 15 -->
                    <div id="orange" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                      <span class="w-[16px] h-[16px] rounded-full bg-[#BE6C49] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                      <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Orange</p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- btn -->
            <button id="save-changes-button" class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
              <p class="font-bold text-[#FFF] text-[14px]">Save Changes</p>
            </button>
          </div>
        </div>
      `
    );

    // declare nameInput, targetInput, counter, and div elements
    const nameInput = document.querySelector("#pot-name-input");
    const counter = document.querySelector("#characters-left");
    const nameInputDiv = document.querySelector("#pot-name-div");
    const targetInput = document.querySelector("#pot-target-input");
    const targetInputDiv = document.querySelector("#pot-target-div");

    // update character count and border color
    const updateNameCounter = () => {
      const charsLeft = 30 - nameInput.value.length;

      // display "Too long!" if character count is below 0, else show remaining characters
      if (charsLeft < 0) {
        counter.textContent = "Too long!";
      } else {
        counter.textContent = `${charsLeft} characters left`;
      }

      // change border color to red if input too long, else keep it default
      nameInputDiv.style.borderColor = charsLeft < 0 ? "red" : "#98908B";
    };

    // reset target input border color to default
    const updateTargetBorder = () => {
      targetInputDiv.style.borderColor = "#98908B";
    };

    // listen for input changes and trigger their specific update funcs
    nameInput.addEventListener("input", updateNameCounter);
    targetInput.addEventListener("input", updateTargetBorder);

    updateNameCounter();
    updateTargetBorder();

    const newPotModal = document.querySelector("#new-pot-modal");
    const newPotCloseBtn = document.querySelector('[data-name="new-pot-close-button"]');

    // new pot close button
    newPotCloseBtn.addEventListener("click", () => {
      // animation
      newPotModal.classList.add("animate-fade-out");
      setTimeout(() => {
        newPotModal.remove();

        // resume page scrolling
        document.body.classList.remove("overflow-hidden");
      }, 200);
    });

    const themeButton = newPotModal.querySelector("#theme-button");
    const themeModal = newPotModal.querySelector("#theme-modal-wrapper");

    // toggle theme modal
    themeButton.addEventListener("click", () => {
      if (!themeModal.classList.contains("hidden")) {
        // animation
        themeModal.classList.add("animate-theme-close");
        setTimeout(() => {
          themeModal.classList.add("hidden");
          themeModal.classList.remove("animate-theme-close");
        }, 300);
      } else {
        themeModal.classList.remove("hidden");
      }
    });

    // close theme modal on outside click
    document.addEventListener("click", (e) => {
      if (!themeButton.contains(e.target) && !themeModal.contains(e.target)) {
        if (!themeModal.classList.contains("hidden")) {
          // animation
          themeModal.classList.add("animate-theme-close");
          setTimeout(() => {
            themeModal.classList.add("hidden");
            themeModal.classList.remove("animate-theme-close");
          }, 300);
        }
      }
    });

    // dont close theme modal if clicked inside
    themeModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // create an array of dom elements based on the color theme of each pot
    const usedThemeElements = pots.map((pot) => {
      const usedTheme = colors[pot.theme];
      const usedThemeElementId = colorIds[usedTheme];

      // get the dom element associated with the theme id and return it as an object
      const usedThemeElement = document.getElementById(usedThemeElementId);
      return { usedThemeElement };
    });

    usedThemeElements.forEach((item) => {
      // access the dom element inside the object
      const el = item.usedThemeElement;

      // add already used message to the theme element
      el.innerHTML += `<p id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;
      el.classList.remove("hover:cursor-pointer");
      el.classList.add("hover:cursor-not-allowed");
    });

    // get all theme options inside the theme modal & init selected theme as null (nothing selected yet)
    const themes = document.querySelector("#theme-modal").children;
    let selectedTheme = null;

    // loop through each theme option
    Array.from(themes).forEach((theme) => {
      theme.addEventListener("click", () => {
        // ignore click if theme already used or selected
        if (theme.querySelector("#alreadyUsed") || theme.querySelector("#selectedTheme")) return;

        // get theme name from id, then get both name and hex color
        const chosenThemeName = Object.entries(colorIds).find(([k, v]) => v === theme.id)?.[0];
        const chosenTheme = Object.keys(colors).find((hex) => colors[hex] === chosenThemeName);

        // if theres a previously selected theme, remove its icon and re-enable hover cursor
        if (document.querySelector("#selectedTheme")) {
          document.querySelector("#selectedTheme").remove();
          selectedTheme.classList.add("hover:cursor-pointer");
          selectedTheme.classList.remove("hover:cursor-not-allowed");
        }
        // mark new selected theme
        selectedTheme = theme;
        selectedTheme.innerHTML += `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;

        // update theme color and label text
        themeButton.querySelector("span").classList.remove("animate-color");
        themeButton.querySelector("span").style.background = chosenTheme;
        themeButton.querySelector("p").textContent = chosenThemeName;

        console.log(chosenTheme);
        console.log(chosenThemeName);

        // close theme modal after theme is selected
        themeModal.classList.add("animate-theme-close");
        setTimeout(() => {
          themeModal.classList.add("hidden");
          themeModal.classList.remove("animate-theme-close");

          // disable pointer cursor on selected theme to indicate its not clickable when theme modal closes
          selectedTheme.classList.remove("hover:cursor-pointer");
          selectedTheme.classList.add("hover:cursor-not-allowed");
        }, 300);
      });
    });

    // validate inputs before submitting data
    validateInputs();
  });
};

addNewPot();

// validates the inputs when the save button is clicked, checking for empty fields, character limits, and format requirements
const validateInputs = () => {
  // declare dom elements for pot name, target, and save button
  const saveChangesBtn = document.querySelector("#save-changes-button");

  const nameInput = document.querySelector("#pot-name-input");
  const targetInput = document.querySelector("#pot-target-input");

  const nameInputDiv = document.querySelector("#pot-name-div");
  const targetInputDiv = document.querySelector("#pot-target-div");

  // listen for click event on save button
  saveChangesBtn.addEventListener("click", () => {
    // clear error message when user types in name input
    nameInput.addEventListener("input", () => {
      const redMsg = nameInputDiv.querySelector("#red-msg");
      if (redMsg) redMsg.remove();
    });

    // validate name input: required, max 30 chars, alphanumeric
    if (nameInput.value.length === 0) {
      nameInputDiv.style.borderColor = "red";
      nameInputDiv.insertAdjacentHTML(
        "beforeend",
        `
        <p id="red-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
      `
      );
    } else if (nameInput.value.length > 30) {
      nameInputDiv.style.borderColor = "red";
      nameInputDiv.insertAdjacentHTML(
        "beforeend",
        `
        <p id="red-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Up to 30 characters allowed</p>
      `
      );
    } else if (!/^[a-zA-Z0-9 ]+$/.test(nameInput.value)) {
      nameInputDiv.style.borderColor = "red";
      nameInputDiv.insertAdjacentHTML(
        "beforeend",
        `
        <p id="red-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Name must be alphanumeric</p>
      `
      );
    }

    // clear error message when user types in target input
    targetInput.addEventListener("input", () => {
      const redMsg = targetInputDiv.querySelector("#red-msg");
      if (redMsg) redMsg.remove();
    });

    // validate target input: required, valid number, not 69
    if (targetInput.value.length === 0) {
      targetInputDiv.style.borderColor = "red";
      targetInputDiv.insertAdjacentHTML(
        "beforeend",
        `
        <p id="red-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
      `
      );
    } else if (!/^\d+(\.\d{1,2})?$/.test(targetInput.value) || targetInput.value < 1 || targetInput.value > 999999) {
      targetInputDiv.style.borderColor = "red";
      targetInputDiv.insertAdjacentHTML(
        "beforeend",
        `
        <p id="red-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Invalid target</p>
      `
      );
    } else if (targetInput.value == 69) {
      targetInputDiv.style.borderColor = "red";
      targetInputDiv.insertAdjacentHTML(
        "beforeend",
        `
        <p id="red-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1  after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">what would ur grandma say</p>
      `
      );
    }
  });
};
