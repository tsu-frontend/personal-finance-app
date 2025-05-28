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

// generates html for theme color blocks: already used and selected themes
function getThemeOptionsHtml({ themes, usedThemes = [], selectedTheme = null }) {
  const selectedThemeIcon = `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;
  const usedTheme = `<p data-id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;
  return Object.entries(themes)
    .map(([hex, name]) => {
      let extra = "";
      let cursorClass = "hover:cursor-pointer";
      if (hex === selectedTheme) {
        extra = selectedThemeIcon;
        cursorClass = "hover:cursor-not-allowed";
      } else if (usedThemes.includes(hex)) {
        extra = usedTheme;
        cursorClass = "hover:cursor-not-allowed";
      }
      return `
      <div id="${hex}" class="group shrink-0 ${cursorClass} hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
        <span style="background-color: ${hex}" class="w-[16px] h-[16px] rounded-full group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">${name}</p>
        ${extra}
      </div>
      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
      `;
    })
    .join("");
}

// self explanatory
function appendModal2(modalInfo, validateInput1, renderData) {
  // stop page scrolling in the background
  document.body.classList.add("overflow-hidden");

  // declaring modal information
  let modalName, input2Value, modalTheme, modalColorName, colorAnimation, themeStatus;
  let tableName = modalInfo.tableName;

  if (modalInfo.modalType === "edit") {
    modalName = modalInfo.modalData.name;
    input2Value = Number(modalInfo.modalData.target).toFixed(2);
    modalTheme = modalInfo.modalData.theme;
    modalColorName = themes[modalInfo.modalData.theme];
    colorAnimation = "";
    themeStatus = true;
  }

  if (modalInfo.modalType === "new") {
    modalName = "";
    input2Value = "";
    modalTheme = "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)";
    modalColorName = "Pick a theme";
    colorAnimation = "animate-color";
    themeStatus = false;
  }

  // get used themes, except current selected theme
  let usedThemes = [];
  if (Array.isArray(modalInfo.item)) {
    usedThemes = modalInfo.item.map(({ theme }) => theme).filter((theme) => theme !== modalTheme);
  }

  // generate color blocks with corresponding state
  const colorBlocks = getThemeOptionsHtml({
    themes,
    usedThemes,
    selectedTheme: modalTheme,
  });

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
          <button id="submit-button" class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
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

  let chosenTheme = modalTheme;

  toggleThemeModal();
  themeSelectHandler({
    themes,
    modalTheme,
    setThemeStatus: (val) => {
      themeStatus = val;
    },
    setChosenTheme: (val) => {
      chosenTheme = val;
    },
  });

  const submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", () => {
    const valid1 = validateInput1();
    const valid2 = validateInput2();
    const valid3 = validateInput3(themeStatus);
    const canSubmit = valid1 && valid2 && valid3;
    if (canSubmit) {
      sendPostFetch(chosenTheme, renderData, tableName);
      closeModal1();
    }
  });
}

// theme picker event logic
function themeSelectHandler({ themes, modalTheme, setThemeStatus, setChosenTheme }) {
  const themeModal = document.querySelector("#theme-modal");
  let selectedTheme = document.querySelector("#theme-modal");
  let chosenTheme = modalTheme;
  const selectedThemeIcon = `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;

  Array.from(themeModal.children).forEach((theme) => {
    // only add event listener to divs and not spans
    if (theme.tagName === "DIV") {
      theme.addEventListener("click", () => {
        // prevent selecting a theme its already used or currently selected
        if (theme.querySelector('[data-id="alreadyUsed"]') || theme.querySelector("#selectedTheme")) return;

        // set the chosen theme and get its name
        chosenTheme = theme.id;
        if (setThemeStatus) setThemeStatus(true);
        if (setChosenTheme) setChosenTheme(chosenTheme);
        validateInput3(true);
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

// self explanatory
function closeModal1() {
  // declaring modal1 and the close button
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
function validateInput3(themeStatus) {
  // flag to track if inputs are valid
  let canSubmit = true;

  // declare theme input div
  const themeInputDiv = document.querySelector("#input-3");

  // reset target input border color to default before validation runs again
  themeInputDiv.style.borderColor = "#98908B";

  // remove previous error msg if exists to prevent duplicates
  const themeRedMsg = themeInputDiv.querySelector("#error-msg");
  if (themeRedMsg) themeRedMsg.remove();

  if (!themeStatus) {
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
}

// self explanatory
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

// sends the pot data to json: id, name, target, and theme
async function sendPostFetch(chosenTheme, renderData, tableName) {
  const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`;
  const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: PUBLIC_KEY,
        Authorization: `Bearer ${PUBLIC_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name: document.querySelector("#input-1").value,
        target: parseFloat(document.querySelector("#input-2").value).toFixed(2),
        total: 0,
        theme: chosenTheme,
      }),
    });
    // update the ui with the new data if the post request was successful
    if (response.ok) renderData();
  } catch (err) {
    console.error(err);
  }
}

///////////////////////////////////////////////////////////

// sends a delete request to remove a pot from the server using its data-id attribute
async function sendDeleteFetch(potId) {
  await fetch(`http://localhost:3000/pots/${potId}`, {
    method: "DELETE",
  });
}

export { appendModal2 };
