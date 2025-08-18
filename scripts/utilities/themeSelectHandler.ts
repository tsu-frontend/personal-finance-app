import { ValidateInput3 } from "./validateInput3.js";
import { themes } from "../constants/themes.js";

class ThemeSelectHandler {
  static handle(setChosenTheme: (theme: string) => void): void {
    const themeModal = document.querySelector("#theme-modal") as HTMLElement;
    Array.from(themeModal.children).forEach((theme) => {
      if ((theme as HTMLElement).tagName === "DIV") {
        theme.addEventListener("click", () => {
          if ((theme as HTMLElement).querySelector('[data-id="alreadyUsed"]') || (theme as HTMLElement).querySelector("#selectedTheme")) return;
          const chosenTheme = (theme as HTMLElement).id;
          ValidateInput3.validate(chosenTheme);
          setChosenTheme(chosenTheme);
          const themeModalWrapper = document.querySelector("#theme-modal-wrapper") as HTMLElement;
          themeModalWrapper.classList.add("animate-theme-close");
          setTimeout(() => {
            themeModalWrapper.classList.add("hidden");
            themeModalWrapper.classList.remove("animate-theme-close");
          }, 300);
          const input3 = document.querySelector("#input-3") as HTMLElement;
          if (input3) {
            const span = input3.querySelector("span");
            const p = input3.querySelector("p");
            if (span) {
              span.classList.remove("animate-color");
              (span as HTMLElement).style.background = chosenTheme;
            }
            if (p && themes) {
              p.textContent = themes[chosenTheme];
            }
          }
        });
      }
    });
  }
}

export { ThemeSelectHandler };
