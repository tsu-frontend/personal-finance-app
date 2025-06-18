import { pageType } from "./pageType.js";

function validateInput1() {
  // flag to track if inputs are valid
  let canSubmit = true;

  // validates the name input: checks if its required within 30 characters and alphanumeric. returns canSubmit state
  if (pageType === "pots") {
    // declare counter, name input and its div
    const counter = document.querySelector("#characters-left");
    const input1 = document.querySelector("#input-1");
    const input1Div = document.querySelector("#input-div-1");

    // calculate how many characters are left before reaching the 30 character limit
    const charsLeft = 30 - input1.value.length;

    // change border color to red if input too long, else keep it default
    if (charsLeft < 0) {
      counter.textContent = "Too long!";
    } else {
      counter.textContent = `${charsLeft} characters left`;
    }

    // change border color to red if input too long, else keep it default
    input1Div.style.borderColor = charsLeft < 0 ? "red" : "#98908B";

    // remove previous error msg if exists to prevent duplicates
    const nameRedMsg = input1Div.querySelector("#error-msg");
    if (nameRedMsg) nameRedMsg.remove();

    // validate name input: required, max 30 chars, alphanumeric
    if (input1.value.length === 0) {
      canSubmit = false;
      input1Div.style.borderColor = "red";
      input1Div.insertAdjacentHTML(
        "beforeend",
        `
      <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
    `
      );
    } else if (input1.value.length > 30) {
      canSubmit = false;
      input1Div.style.borderColor = "red";
      input1Div.insertAdjacentHTML(
        "beforeend",
        `
      <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Up to 30 characters allowed</p>
    `
      );
    } else if (!/^[a-zA-Z0-9 ]+$/.test(input1.value)) {
      canSubmit = false;
      input1Div.style.borderColor = "red";
      input1Div.insertAdjacentHTML(
        "beforeend",
        `
      <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Name must be alphanumeric</p>
    `
      );
    }

    // return the state of canSubmit
  } else if (pageType === "budgets") {
    // natia's part
    // forge the proof that first input’s truth doth stand!
  }

  // return the state of canSubmit
  return canSubmit;
}

export { validateInput1 };
