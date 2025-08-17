import { ValidateInput3 } from "./validateInput3.js";
import { themes } from "../constants/themes.js";
class ThemeSelectHandler {
    static handle(setChosenTheme) {
        const themeModal = document.querySelector("#theme-modal");
        Array.from(themeModal.children).forEach((theme) => {
            if (theme.tagName === "DIV") {
                theme.addEventListener("click", () => {
                    if (theme.querySelector('[data-id="alreadyUsed"]') || theme.querySelector("#selectedTheme"))
                        return;
                    const chosenTheme = theme.id;
                    ValidateInput3.validate(chosenTheme);
                    setChosenTheme(chosenTheme);
                    const themeModalWrapper = document.querySelector("#theme-modal-wrapper");
                    themeModalWrapper.classList.add("animate-theme-close");
                    setTimeout(() => {
                        themeModalWrapper.classList.add("hidden");
                        themeModalWrapper.classList.remove("animate-theme-close");
                    }, 300);
                    const input3 = document.querySelector("#input-3");
                    if (input3) {
                        const span = input3.querySelector("span");
                        const p = input3.querySelector("p");
                        if (span) {
                            span.classList.remove("animate-color");
                            span.style.background = chosenTheme;
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
