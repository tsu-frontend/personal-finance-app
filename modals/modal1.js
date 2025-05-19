// title subTitle modal buttonText input-div-2 input-2 input-2-text input2Value

function appendModal(modal, modalData, firstInput) {
  console.log("working");
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
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">${sum - label - text}</p>
                  <div id="input-div-2" class="w-full flex items-center gap-[12px] px-[20px] py-[12px] h-[48px] border-1 border-[#98908B] rounded-[8px] relative">
                    <span class="text-[#98908B] text-[14px] font-normal leading-[150%]">$</span>
                    <input id="input-2" type="text" class="hover:cursor-pointer h-[21px] w-full focus:outline-none" value="${modalData.input2Value}" />
                  </div>
                </div>
                <div class="w-full flex flex-col gap-[4px]">
                  <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Theme</p>
                  <div id="theme-button" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
                    <span class="w-[16px] h-[16px] rounded-full" style="background-color: ${modalData.modalTheme}"></span>
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
}

export { appendModal };
