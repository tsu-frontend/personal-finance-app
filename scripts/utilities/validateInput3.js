class ValidateInput3 {
    static validate(chosenTheme) {
        let canSubmit = true;
        const themeInputDiv = document.querySelector("#input-3");
        themeInputDiv.style.borderColor = "#98908B";
        const themeRedMsg = themeInputDiv.querySelector("#error-msg");
        if (themeRedMsg)
            themeRedMsg.remove();
        if (!chosenTheme) {
            canSubmit = false;
            themeInputDiv.style.borderColor = "red";
            themeInputDiv.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>`);
        }
        return canSubmit;
    }
}
export { ValidateInput3 };
