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

export { validateInput2 };
