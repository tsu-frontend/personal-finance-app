import { appendModal1 } from "../modals/modal1.js";
import { appendModal2 } from "../modals/modal2.js";

let pots = [];

const renderData = async () => {
  const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`;
  const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/pots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: PUBLIC_KEY,
        Authorization: `Bearer ${PUBLIC_KEY}`,
      },
    });
    const data = await response.json();
    pots = data;

    renderPots(pots);
    openNewPotModal();
    // appendModal1(pots, appendDeleteModal, appendEditModal);
    appendModal1();
  } catch (err) {
    console.error(err);
  }
};
renderData();

// render pots into container
function renderPots(pots) {
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
          <div data-name="options-button" class="ml-auto hover:cursor-pointer relative">
            <img src="../assets/images/icon-ellipsis.svg" class="w-[16px] h-[16px]" />
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
}

// open the modal for adding a new pot
function openNewPotModal() {
  const newPotButton = document.querySelector("#new-pot-button");
  newPotButton.addEventListener("click", () => {
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
      tableName: "pots",
      item: pots,
      firstInput,
      title: "Add New Pot",
      subTitle: "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
      field2Title: "Target",
      buttonText: "Add pot",
      modalType: "new",
    };
    const fetchInfo = {
      fetchValue1: { key: "name", value: () => document.querySelector("#input-1").value },
      fetchValue2: "target",
      fetchValue3: { key: "total", value: () => 0 },
    };
    appendModal2(modalInfo, fetchInfo, validateInput1, renderData);

    // input1 logic
    const input1 = document.querySelector("#input-1");
    const charsLeft = 30 - input1.value.length;
    const counter = document.querySelector("#characters-left");
    counter.textContent = `${charsLeft} characters left`;
    input1.addEventListener("input", () => validateInput1());
  });
}

// delete pot logic
function appendDeleteModal(pot, potData, potId) {
  const potOptions = pot.querySelector('[data-name="pot-options"]');
  const optionsModal = pot.querySelector('[data-name="pot-options-modal"]');
  const deleteButton = pot.querySelector('[data-name="delete-pot-button"]');

  deleteButton.addEventListener("click", () => {
    if (!optionsModal.classList.contains("hidden")) {
      optionsModal.classList.add("animate-close");
      setTimeout(() => {
        optionsModal.classList.add("hidden");
        optionsModal.classList.remove("flex", "animate-close");
      }, 100);
    }
    document.body.classList.add("overflow-hidden");
    let potName = potData.name;
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
    pot.querySelectorAll('[data-name="delete-close-button"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const deleteModal = pot.querySelector("#delete-modal");
        deleteModal.classList.add("animate-fade-out");
        setTimeout(() => {
          deleteModal.remove();
          document.body.classList.remove("overflow-hidden");
        }, 200);
      });
    });
    const delConfirmBtn = pot.querySelector('[data-name="delete-pot-confirm"]');
    delConfirmBtn.addEventListener("click", () => {
      const deleteModal = pot.querySelector("#delete-modal");
      deleteModal.classList.add("animate-fade-out");
      setTimeout(() => {
        deleteModal.remove();
        document.body.classList.remove("overflow-hidden");
        const rect = pot.getBoundingClientRect();
        pot.style.position = "fixed";
        pot.style.left = `${rect.left}px`;
        pot.style.top = `${rect.top}px`;
        pot.style.width = `${rect.width}px`;
        pot.classList.add("animate-pop-out");
        setTimeout(() => {
          pot.remove();
        }, 2000);
      }, 200);
      sendDeleteFetch(potId);
    });
  });
}

// validates the name input: checks if its required within 30 characters and alphanumeric. returns canSubmit state
function validateInput1() {
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
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// move to modal1.js:

// sends an update request to edit the pot on the server
async function updatePotData(chosenTheme) {
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

  if (response.ok) renderData();
}
