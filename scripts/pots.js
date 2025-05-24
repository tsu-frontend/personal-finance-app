import { appendModal, validateInput2, validateInput3, closeModal1 } from "../modals/modal1.js";

let pots = [];

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

      // delete modal close buttons
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

      // delete pot confirm button
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
        deletePot(pot);
      });
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // editttttttttttttttttttttttttttttttttt
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

      // declare firstInput for it to be used in the appendModal func
      const firstInput = `
        <div class="w-full flex flex-col gap-[4px]">
          <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
          <div id="input-div-1" class="w-full px-[20px] py-[12px] flex items-center rounded-[8px] border-1 border-[#98908B] relative">
            <input id="input-1" type="text" placeholder="e.g. Rainy Days" class="hover:cursor-pointer h-[21px] w-full relative focus:outline-none" value="${potData.name}" />
          </div>
          <p id="characters-left" class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right"></p>
        </div>
      `;

      const modalInfo = {
        modalData: potData,
        modalId: potId,
        item: pots,
        firstInput,
        title: "Edit Pot",
        subTitle: "If your saving targets change, feel free to update your pots.",
        field2Title: "Target",
        buttonText: "Save Changes",
        modalType: "edit",
      };
      // append edit pot modal
      appendModal(modalInfo);

      // input 1 logic, updates counter
      const input1 = document.querySelector("#input-1");
      const charsLeft = 30 - input1.value.length;
      const counter = document.querySelector("#characters-left");
      counter.textContent = `${charsLeft} characters left`;

      input1.addEventListener("input", () => validateInput1());
    });
  });
};

// newwwwwwww
const newPotButton = document.querySelector("#new-pot-button");
newPotButton.addEventListener("click", () => {
  // stop page scrolling in the background
  document.body.classList.add("overflow-hidden");

  // declare firstInput for it to be used in the appendModal func
  const firstInput = `
        <div class="w-full flex flex-col gap-[4px]">
          <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
          <div id="input-div-1" class="w-full px-[20px] py-[12px] flex items-center rounded-[8px] border-1 border-[#98908B] relative">
            <input id="input-1" type="text" placeholder="e.g. Rainy Days" class="hover:cursor-pointer h-[21px] w-full relative focus:outline-none" />
          </div>
          <p id="characters-left" class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right"></p>
        </div>
      `;

  const modalInfo = {
    modalData: potData,
    modalId: potId,
    item: pots,
    firstInput,
    title: "Add New Pot",
    subTitle: "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
    field2Title: "Target",
    buttonText: "Add pot",
    modalType: "new",
  };
  // append edit pot modal
  appendModal(modalInfo);

  // input 1 logic, updates counter
  const input1 = document.querySelector("#input-1");
  const charsLeft = 30 - input1.value.length;
  const counter = document.querySelector("#characters-left");
  counter.textContent = `${charsLeft} characters left`;

  input1.addEventListener("input", () => validateInput1());
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// end of work part

// validates the name input: checks if its required within 30 characters and alphanumeric. returns canSubmit state
const validateInput1 = () => {
  // flag to track if inputs are valid
  let canSubmit = true;

  // declare counter, name input and its div
  const counter = document.querySelector("#characters-left");
  const input1 = document.querySelector("#input-1");
  const input1Div = document.querySelector("#input-div-1");

  // calculate how many characters are left before reaching the 30 character limit
  const charsLeft = 30 - input1.value.length;

  // change border color to red if input too long, else keep it default
  if (charsLeft < 0) {
    counter.textContent = "Too long!";
  } else {
    counter.textContent = `${charsLeft} characters left`;
  }

  // change border color to red if input too long, else keep it default
  input1Div.style.borderColor = charsLeft < 0 ? "red" : "#98908B";

  // remove previous error msg if exists to prevent duplicates
  const nameRedMsg = input1Div.querySelector("#error-msg");
  if (nameRedMsg) nameRedMsg.remove();

  // validate name input: required, max 30 chars, alphanumeric
  if (input1.value.length === 0) {
    canSubmit = false;
    input1Div.style.borderColor = "red";
    input1Div.insertAdjacentHTML(
      "beforeend",
      `
      <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
    `
    );
  } else if (input1.value.length > 30) {
    canSubmit = false;
    input1Div.style.borderColor = "red";
    input1Div.insertAdjacentHTML(
      "beforeend",
      `
      <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Up to 30 characters allowed</p>
    `
    );
  } else if (!/^[a-zA-Z0-9 ]+$/.test(input1.value)) {
    canSubmit = false;
    input1Div.style.borderColor = "red";
    input1Div.insertAdjacentHTML(
      "beforeend",
      `
      <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Name must be alphanumeric</p>
    `
    );
  }

  // return the state of canSubmit
  return canSubmit;
};

// sends the pot data to json: id, name, target, and theme
const sendPotsData = async (chosenTheme) => {
  const response = await fetch("http://localhost:3000/pots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: uniqueId(),
      name: document.querySelector("#pot-name-input").value,
      target: parseFloat(document.querySelector("#pot-target-input").value).toFixed(2),
      total: 0,
      theme: chosenTheme,
    }),
  });

  // update the ui with the new data if the post request was successful
  if (response.ok) renderPotsData();
};

// generates a unique 6-digit id that doesnt exist in the current pots array
const uniqueId = () => {
  let id;
  const existingIds = new Set(pots.map((pot) => pot.id));
  do {
    id = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  } while (existingIds.has(id));

  // return unique id
  return id;
};

// sends a delete request to remove a pot from the server using its data-id attribute
const deletePot = async (pot) => {
  const potId = pot.getAttribute("data-id");

  await fetch(`http://localhost:3000/pots/${potId}`, {
    method: "DELETE",
  });
};

// checks if json-server is running and shows setup instructions if not
// fetch("http://localhost:3000").catch(() => {
//   console.log(`%c⚠️%cDELETE, POST, and PATCH wont work because json-server isn't set up!`, "color: red; font-size: 50px; padding: 0 50%;", "color: red; font-size: 20px;");

//   console.log(
//     `%cRun this to install json-server (only once):
// %cnpm install -g json-server

// %cThen start it with:
// %cjson-server data.json

// %cAlso, add these lines to settings.json to stop live reload on data.json changes:
// %c"files.watcherExclude": { "**/data.json": true }
// liveServer.settings.ignoreFiles": ["**/data.json"]
// liveServer.settings.noBrowserReloadOnSave": true`,
//     "color: initial; font-size: 24px;",
//     "color: initial; font-size: 16px;",
//     "color: initial; font-size: 24px;",
//     "color: initial; font-size: 16px;",
//     "color: initial; font-size: 24px;",
//     "color: initial; font-size: 16px;"
//   );
// });

// sends an update request to edit the pot on the server
const updatePotData = async (chosenTheme) => {
  const potId = document.querySelector("#edit-modal").querySelector("[data-id]").getAttribute("data-id");

  console.log(potId);

  const response = await fetch(`http://localhost:3000/pots/${potId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.querySelector("#pot-name-input").value,
      target: parseFloat(document.querySelector("#pot-target-input").value).toFixed(2),
      theme: chosenTheme,
    }),
  });

  if (response.ok) renderPotsData();
};
