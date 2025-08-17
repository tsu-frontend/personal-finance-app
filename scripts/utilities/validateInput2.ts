class ValidateInput2 {
  static validate(): boolean {
    let canSubmit = true;
    const input2 = document.querySelector("#input-2") as HTMLInputElement;
    const input2Div = document.querySelector("#input-2-div") as HTMLElement;
    input2Div.style.borderColor = "#98908B";
    const redMsg = input2Div.querySelector("#error-msg");
    if (redMsg) redMsg.remove();
    if (input2.value.length === 0) {
      canSubmit = false;
      input2Div.style.borderColor = "red";
      input2Div.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>`);
    } else if (!/^\d+(\.\d{1,2})?$/.test(input2.value) || Number(input2.value) < 1 || Number(input2.value) > 999999) {
      canSubmit = false;
      input2Div.style.borderColor = "red";
      input2Div.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Invalid target</p>`);
    } else if (input2.value == "69") {
      canSubmit = false;
      input2Div.style.borderColor = "red";
      input2Div.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">what would ur grandma say</p>`);
    }
    return canSubmit;
  }
}

export { ValidateInput2 };
