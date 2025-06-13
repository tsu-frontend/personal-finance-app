import { clickOutClose } from "../functions/clickOutClose.js";
import { themeSelectHandler } from "../functions/themeSelectHandler.js";
import { themes } from "../constants/themes.js";

function openThemeModal(chosenTheme, data, setChosenTheme) {
  const themeButton = document.querySelector("#input-3");

  const existingModal = document.querySelector("#theme-modal-wrapper");
  if (existingModal) existingModal.remove();

  // generate colorBlocks html for the modal
  const usedThemes = data.filter((item) => item.theme && item.theme !== chosenTheme).map((item) => item.theme);
  const selectedThemeIcon = `<img id="selectedTheme" src="../assets/images/icon-selected.svg" class="w-[16px] h-[16px] ml-auto group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu" />`;
  const usedTheme = `<p data-id="alreadyUsed" class="text-[#696868] text-[12px] leading-[150%] group-hover:scale-x-[1.2] transition-all duration-300 ease transform-gpu ml-auto">Already used</p>`;

  const colorBlocks = Object.entries(themes)

    .map(([hex, name]) => {
      let extra = "";
      let cursorClass = "hover:cursor-pointer";

      if (hex === chosenTheme) {
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

  // toggle theme modal
  themeButton.insertAdjacentHTML(
    "beforeend",
    `
      <div id="theme-modal-wrapper" class="animate-theme-open cursor-auto max-h-[300px] [@media(900px>=height)]:max-h-[200px] [&::-webkit-scrollbar]:hidden overflow-y-auto rounded-[8px] bg-[#FFF] absolute left-[-1px] top-[64px] w-[calc(100%+2px)] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
        <div id="theme-modal" class="h-full [@media(700px>=height)]:h-[100px] w-full flex flex-col px-[20px]">
          ${colorBlocks}
        </div>
      </div>
    `
  );
  // close theme modal on outside click
  setTimeout(() => {
    clickOutClose(themeModal, "animate-theme-close", 300);
  }, 100);

  const themeModal = document.querySelector("#theme-modal-wrapper");
  // dont close theme modal if clicked inside
  themeModal.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  themeSelectHandler(setChosenTheme);
}

export { openThemeModal };
