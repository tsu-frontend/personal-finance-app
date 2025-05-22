// title subTitle modal buttonText input-2-div input-2 input-2-text input2

function appendModal(modal, modalData, firstInput) {
  // temp variables
  // const modalType = "edit";
  const modalType = "new";
  const title = "Edit Pot";
  const subTitle = "If your saving targets change, feel free to update your pots.";
  const field2Title = "Target";
  const buttonText = "Save Changes";

  let colorAnimation = "";
  if (modalType === "new") {
    modalData.modalName = "";
    modalData.input2Value = "";
    modalData.modalColorName = "Pick a theme";
    let modalTheme = "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)";
    colorAnimation = "animate-color";
  }

  modal.insertAdjacentHTML(
    "beforeend",
    `
          <div id="modal" class="animate-fade-in z-2 fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
            <div data-id="${modalData.modalId}" class="bg-[#FFF] w-[335px] md:w-[560px] rounded-[12px] flex flex-col gap-[20px] p-[32px]">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-[#201F24] text-[20px] md:text-[32px] font-bold leading-[120%]">${title}</h1>
                <img data-name="close-button" src="../assets/images/icon-close-modal.svg" class="hover:cursor-pointer w-[25.5px] h-[25.5px]" />
              </div>
              <p class="w-full text-[#696868] text-[14px] font-normal leading-[150%]">${subTitle}</p>
              <div class="w-full flex flex-col gap-[16px]">
              ${firstInput}
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">${field2Title}</p>
                  <div id="input-2-div" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                    <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                    <input id="input-2" type="text" placeholder="e.g. 2000" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" value="${modalData.input2Value}" />
                  </div>
                </div>
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Theme</p>
                  <div id="input-3" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                    <span class="${colorAnimation} w-[16px] h-[16px] rounded-full" style="background: ${modalData.modalTheme}"></span>
                    <p class="text-[#201F24] text-[14px] font-normal">${modalData.modalColorName}</p>
                    <img src="../assets/images/icon-caret-down.svg" class="ml-auto" />
                    <div id="theme-modal-wrapper" class="animate-theme-open cursor-auto hidden max-h-[300px] [@media(900px>=height)]:max-h-[200px] [&::-webkit-scrollbar]:hidden overflow-y-auto rounded-[8px] bg-[#FFF] absolute left-[-1px] top-[64px] w-[calc(100%+2px)] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
                    <div id="theme-modal" class="h-full [@media(700px>=height)]:h-[100px] w-full flex flex-col px-[20px]">
                      <div id="green" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#277C78] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Green</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="yellow" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#F2CDAC] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Yellow</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="cyan" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#82C9D7] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Cyan</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="navy" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#626070] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Navy</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="red" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#C94736] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Red</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="purple" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#826CB0] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Purple</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="turquoise" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#597C7C] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Turquoise</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="brown" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#93674F] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Brown</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="magenta" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#934F6F] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Magenta</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="blue" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#3F82B2] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Blue</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="navyGrey" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#97A0AC] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Navy Grey</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="armyGreen" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#7F9161] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Army Green</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="pink" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#f72d93] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Pink</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="gold" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#CAB361] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Gold</p>
                      </div>
                      <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
                      <div id="orange" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
                        <span class="w-[16px] h-[16px] rounded-full bg-[#BE6C49] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu"></span>
                        <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">Orange</p>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <button id="save-changes-button" class="hover:cursor-pointer w-full bg-[#201F24] rounded-[8px] p-[16px]">
                <p class="font-bold text-[#FFF] text-[14px]">${buttonText}</p>
              </button>
            </div>
          </div>
       `
  );

  // declare input fields and their divs
  // const input1 = document.querySelector("#input-1");
  // const input3 = document.querySelector("#input-3");

  // const input1Div = document.querySelector("#input-1-div");
  // const input3Div = document.querySelector("#input-3-div");

  // return the ...idfk yet
  return;
}

function closeModal1() {
  // declaring modal1m and the close button
  const modal1 = document.querySelector("#modal");
  const closeButton = document.querySelector('[data-name="close-button"]');

  closeButton.addEventListener("click", () => {
    // animation
    modal1.classList.add("animate-fade-out");
    setTimeout(() => {
      modal1.remove();

      // resume page scrolling
      document.body.classList.remove("overflow-hidden");
    }, 200);
  });
}

function validateInput2() {
  // flag to track if inputs are valid
  let canSubmit = true;

  // declare input 2 and its div
  const input2 = document.querySelector("#input-2");
  const input2Div = document.querySelector("#input-2-div");

  // reset input 2 div border color to default before validation runs again
  input2Div.style.borderColor = "#98908B";

  // remove previous error msg if exists to prevent duplicates
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

export { appendModal, validateInput2, closeModal1 };
