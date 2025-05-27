// :)
const themes = {
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

const colorBlocks = Object.entries(themes)
  .map(
    ([hex, name]) =>
      `
      <div id="${hex}" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
        <span style="background-color: ${hex}" class="w-[16px] h-[16px] rounded-full group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">${name}</p>
      </div>
      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
    `
  )
  .join("");

function appendModal(modalInfo) {
  // stop page scrolling in the background
  document.body.classList.add("overflow-hidden");

  // declaring modal information
  let modalName, input2Value, modalTheme, modalColorName, colorAnimation;

  if (modalInfo.modalType === "edit") {
    modalName = modalInfo.modalData.name;
    input2Value = Number(modalInfo.modalData.target).toFixed(2);
    modalTheme = modalInfo.modalData.theme;
    modalColorName = themes[modalInfo.modalData.theme];
    colorAnimation = "";
  }

  if (modalInfo.modalType === "new") {
    modalName = "";
    input2Value = "";
    modalTheme = "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)";
    modalColorName = "Pick a theme";
    colorAnimation = "animate-color";
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div id="modal1" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
        <div data-id="${modalInfo.modalId}" class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
          <div class="w-full flex justify-between items-center">
            <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">${modalInfo.title}</h1>
            <img data-name="close-button" src="../assets/images/icon-close-modal.svg" class="hover:cursor-pointer w-[25.5px] h-[25.5px]" />
          </div>
          <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">${modalInfo.subTitle}</p>
          <div class="w-full flex flex-col gap-[16px]">
            ${modalInfo.firstInput}
            <div class="w-full flex flex-col gap-[4px]">
              <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">${modalInfo.field2Title}</p>
              <div id="input-2-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                <input id="input-2" type="text" placeholder="e.g. 2000" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" value="${input2Value}" />
              </div>
            </div>
            <div class="w-full flex flex-col gap-[4px]">
              <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Theme</p>
              <div id="input-3" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                <span class="${colorAnimation} w-[16px] h-[16px] rounded-full" style="background: ${modalTheme}"></span>
                <p class="text-[#201F24] text-[14px] font-normal">${modalColorName}</p>
                <img src="../assets/images/icon-caret-down.svg" class="ml-auto" />
                <div id="theme-modal-wrapper" class="animate-theme-open cursor-auto hidden max-h-[300px] [@media(900px>=height)]:max-h-[200px] [&::-webkit-scrollbar]:hidden overflow-y-auto rounded-[8px] bg-[#FFF] absolute left-[-1px] top-[64px] w-[calc(100%+2px)] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
                <div id="theme-modal" class="h-full [@media(700px>=height)]:h-[100px] w-full flex flex-col px-[20px]">
                  ${colorBlocks}
                </div>
                </div>
              </div>
            </div>
          </div>
          <button id="save-changes-button" class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
            <p class="font-bold text-[#FFF] text-[14px]">${modalInfo.buttonText}</p>
          </button>
        </div>
      </div>
    `
  );

  const closeButton = document.querySelector('[data-name="close-button"]');
  closeButton.addEventListener("click", () => closeModal1());

  const input2 = document.querySelector("#input-2");
  input2.addEventListener("input", () => validateInput2());

  toggleThemeModal();

  // ==========================================================================================================================================

  const selectedThemeIcon = `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;
  const usedTheme = `<p id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;

  let selectedTheme = document.getElementById(modalTheme);

  if (selectedTheme) {
    selectedTheme.innerHTML += selectedThemeIcon;
    selectedTheme.classList.replace("hover:cursor-pointer", "hover:cursor-not-allowed");
  }

  const themeModal = document.querySelector("#theme-modal");
  let chosenTheme = modalTheme;

  // mark already used themes except the currently selected one
  if (Array.isArray(modalInfo.item)) {
    modalInfo.item.forEach(({ theme }) => {
      // skip marking the current selected theme as already used
      if (theme !== modalTheme) {
        const el = document.getElementById(theme);

        // only add already used if not already present
        if (el && !el.querySelector('[data-id="alreadyUsed"]')) {
          el.innerHTML += `<p data-id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;
          el.classList.replace("hover:cursor-pointer", "hover:cursor-not-allowed");
        }
      }
    });
  }

  // add click event listeners to each theme option for selection
  Array.from(themeModal.children).forEach((theme) => {
    // only add event listener to divs and not spans
    if (theme.tagName === "DIV") {
      theme.addEventListener("click", () => {
        // prevent selecting a theme its already used or currently selected
        if (theme.querySelector('[data-id="alreadyUsed"]') || theme.querySelector("#selectedTheme")) return;

        // set the chosen theme and get its name
        chosenTheme = theme.id;
        const chosenThemeName = themes[chosenTheme];

        // remove previous selection icon if any
        document.querySelector("#selectedTheme")?.remove();

        // restore pointer cursor for previously selected theme
        selectedTheme?.classList.replace("hover:cursor-not-allowed", "hover:cursor-pointer");

        // mark the new selected theme
        selectedTheme = theme;
        selectedTheme.innerHTML += selectedThemeIcon;

        // update the theme button color and label
        const themeButton = document.querySelector("#input-3");
        const span = themeButton.querySelector("span");
        span.classList.remove("animate-color");
        span.style.background = chosenTheme;
        themeButton.querySelector("p").textContent = chosenThemeName;

        // close the theme modal with animation
        const themeModalWrapper = document.querySelector("#theme-modal-wrapper");
        themeModalWrapper.classList.add("animate-theme-close");
        setTimeout(() => {
          themeModalWrapper.classList.add("hidden");
          themeModalWrapper.classList.remove("animate-theme-close");
          // disable pointer cursor on the selected theme
          selectedTheme.classList.replace("hover:cursor-pointer", "hover:cursor-not-allowed");
        }, 300);
      });
    }
  });
}

function closeModal1() {
  // declaring modal1m and the close button
  const modal1 = document.querySelector("#modal1");

  // animation
  modal1.classList.add("animate-fade-out");
  setTimeout(() => {
    modal1.remove();

    // resume page scrolling
    document.body.classList.remove("overflow-hidden");
  }, 200);
}

// validates the second input: checks if its required and a valid number. returns canSubmit state
function validateInput2() {
  // flag to track if inputs are valid
  let canSubmit = true;

  // declare input 2 and its div
  const input2 = document.querySelector("#input-2");
  const input2Div = document.querySelector("#input-2-div");

  // reset input2Div border color and error msg to default before validation runs again
  input2Div.style.borderColor = "#98908B";
  const redMsg = input2Div.querySelector("#error-msg");
  if (redMsg) redMsg.remove();

  // validate second input: required, valid number, not 69
  if (input2.value.length === 0) {
    canSubmit = false;
    input2Div.style.borderColor = "red";
    input2Div.insertAdjacentHTML(
      "beforeend",
      `
        <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
      `
    );
  } else if (!/^\d+(\.\d{1,2})?$/.test(input2.value) || input2.value < 1 || input2.value > 999999) {
    canSubmit = false;
    input2Div.style.borderColor = "red";
    input2Div.insertAdjacentHTML(
      "beforeend",
      `
        <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Invalid target</p>
      `
    );
  } else if (input2.value == 69) {
    canSubmit = false;
    input2Div.style.borderColor = "red";
    input2Div.insertAdjacentHTML(
      "beforeend",
      `
        <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">what would ur grandma say</p>
      `
    );
  }

  // return the state of canSubmit
  return canSubmit;
}

// validates if a theme is selected
const validateInput3 = (chosenTheme) => {
  // flag to track if inputs are valid
  let canSubmit = true;

  // declare theme input div
  const themeInputDiv = document.querySelector("#theme-button");

  // reset target input border color to default before validation runs again
  themeInputDiv.style.borderColor = "#98908B";

  // remove previous error msg if exists to prevent duplicates
  const themeRedMsg = themeInputDiv.querySelector("#error-msg");
  if (themeRedMsg) themeRedMsg.remove();

  if (!chosenTheme) {
    canSubmit = false;
    themeInputDiv.style.borderColor = "red";
    themeInputDiv.insertAdjacentHTML(
      "beforeend",
      `
        <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
      `
    );
  }

  // return the state of canSubmit
  return canSubmit;
};

function toggleThemeModal() {
  const themeButton = modal1.querySelector("#input-3");
  const themeModal = modal1.querySelector("#theme-modal-wrapper");

  // toggle theme modal
  themeButton.addEventListener("click", () => {
    if (!themeModal.classList.contains("hidden")) {
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
}

export { appendModal, validateInput2, validateInput3, closeModal1 };

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// save changes code:

// // create an array of dom elements based on the color theme of each pot
// const usedThemeElements = pots.map((pot) => {
//   const usedTheme = colors[pot.theme];
//   const usedThemeElementId = colorIds[usedTheme];

//   // get the dom element associated with the theme id and return it as an object
//   const usedThemeElement = document.getElementById(usedThemeElementId);
//   return { usedThemeElement };
// });

// // color
// usedThemeElements.forEach((item) => {
//   // access the dom element inside the object
//   const el = item.usedThemeElement;

//   // add already used message to the theme element
//   el.innerHTML += `<p id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;
//   el.classList.remove("hover:cursor-pointer");
//   el.classList.add("hover:cursor-not-allowed");
// });

// // get all theme options inside the theme modal & init selected theme as null (nothing selected yet)
// const themes = document.querySelector("#theme-modal").children;
// let selectedTheme = null;

// let chosenTheme;
// // loop through each theme option
// Array.from(themes).forEach((theme) => {
//   theme.addEventListener("click", () => {
//     // ignore click if theme already used or selected
//     if (theme.querySelector("#alreadyUsed") || theme.querySelector("#selectedTheme")) return;

//     // get theme name from id, then get both name and hex color
//     const chosenThemeName = Object.entries(colorIds).find(([k, v]) => v === theme.id)?.[0];
//     chosenTheme = Object.keys(colors).find((hex) => colors[hex] === chosenThemeName);

//     // if theres a previously selected theme, remove its icon and re-enable hover cursor
//     if (document.querySelector("#selectedTheme")) {
//       document.querySelector("#selectedTheme").remove();
//       selectedTheme.classList.add("hover:cursor-pointer");
//       selectedTheme.classList.remove("hover:cursor-not-allowed");
//     }
//     // mark new selected theme
//     selectedTheme = theme;
//     selectedTheme.innerHTML += `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;

//     // update theme color and label text
//     themeButton.querySelector("span").classList.remove("animate-color");
//     themeButton.querySelector("span").style.background = chosenTheme;
//     themeButton.querySelector("p").textContent = chosenThemeName;

//     // close theme modal after theme is selected
//     themeModal.classList.add("animate-theme-close");
//     setTimeout(() => {
//       themeModal.classList.add("hidden");
//       themeModal.classList.remove("animate-theme-close");

//       // disable pointer cursor on selected theme to indicate its not clickable when theme modal closes
//       selectedTheme.classList.remove("hover:cursor-pointer");
//       selectedTheme.classList.add("hover:cursor-not-allowed");
//     }, 300);

//     // revalidate after theme selection
//     validateInput3(chosenTheme);
//   });
// });

// // validates the inputs when the save button is clicked, checking for empty fields, character limits, and format requirements before saving pot
// const saveChangesBtn = document.querySelector("#save-changes-button");
// saveChangesBtn.addEventListener("click", () => {
//   // validate all inputs
//   validateInput2();
//   validateInput1();
//   validateInput3(chosenTheme);

//   // get the validation result from each function, which returns the canSubmit state for the target input
//   const nameValid = validateInput2();
//   const targetValid = validateInput1();
//   const themeValid = validateInput3(chosenTheme);

//   // check if all validations pass
//   if (nameValid && targetValid && themeValid) {
//     console.log("yessir");
//     sendPotsData(chosenTheme);

//     // close new pot modal
//     newPotModal.classList.add("animate-fade-out");
//     setTimeout(() => {
//       newPotModal.remove();

//       // resume page scrolling
//       document.body.classList.remove("overflow-hidden");
//     }, 200);
//   } else {
//     console.log("nope");
//   }
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// second save changes code:

// // validates the inputs when the save button is clicked, checking for empty fields, character limits, and format requirements before saving pot
// const saveChangesBtn = document.querySelector("#save-changes-button");
// saveChangesBtn.addEventListener("click", () => {
//   // validate all inputs
//   validateInput2();
//   validateInput1();

//   // get the validation result from each function, which returns the canSubmit state for the target input
//   const input1Valid = validateInput2();
//   const input2Valid = validateInput1();

//   const modal1 = document.querySelector("#modal1");
//   // check if all validations pass
//   if (input1Valid && input2Valid) {
//     // updatePotData(chosenTheme);

//     // close new pot modal
//     modal1.classList.add("animate-fade-out");
//     setTimeout(() => {
//       modal1.remove();

//       // resume page scrolling
//       document.body.classList.remove("overflow-hidden");
//     }, 200);
//   }
// });
