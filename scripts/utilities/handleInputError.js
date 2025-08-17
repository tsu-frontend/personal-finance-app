class HandleInputError {
    static display(inputDiv, errorMsg) {
        inputDiv.style.borderColor = "#98908B";
        const prevMsg = inputDiv.querySelector("#error-msg");
        if (prevMsg)
            prevMsg.remove();
        if (errorMsg) {
            inputDiv.style.borderColor = "red";
            inputDiv.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">${errorMsg}</p>`);
        }
    }
}
export { HandleInputError };
