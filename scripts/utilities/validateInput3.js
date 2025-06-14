// validates if a theme is selected
function validateInput3(chosenTheme) {
  // flag to track if inputs are valid
  let canSubmit = true;

  // declare theme input div
  const themeInputDiv = document.querySelector("#input-3");

  // reset target input border color to default before validation runs again
  themeInputDiv.style.borderColor = "#98908B";

  // remove previous error msg if exists to prevent duplicates
  const themeRedMsg = themeInputDiv.querySelector("#error-msg");
  if (themeRedMsg) themeRedMsg.remove();

  if (!chosenTheme) {
    canSubmit = false;
    themeInputDiv.style.borderColor = "red";
    themeInputDiv.insertAdjacentHTML(
      "beforeend",
      `
        <p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>
      `
    );
  }

  // return the state of canSubmit
  console.log("3 = " + canSubmit);
  return canSubmit;
}

export { validateInput3 };
