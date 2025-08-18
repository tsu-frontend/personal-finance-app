import { pageType } from "./pageType.js";
class ValidateInput1 {
    static validate() {
        let canSubmit = true;
        if (pageType === "pots") {
            const counter = document.querySelector("#characters-left");
            const input1 = document.querySelector("#input-1");
            const input1Div = document.querySelector("#input-div-1");
            const charsLeft = 30 - input1.value.length;
            counter.textContent = charsLeft < 0 ? "Too long!" : `${charsLeft} characters left`;
            input1Div.style.borderColor = charsLeft < 0 ? "red" : "#98908B";
            const nameRedMsg = input1Div.querySelector("#error-msg");
            if (nameRedMsg)
                nameRedMsg.remove();
            if (input1.value.length === 0) {
                canSubmit = false;
                input1Div.style.borderColor = "red";
                input1Div.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">This field is required</p>`);
            }
            else if (input1.value.length > 30) {
                canSubmit = false;
                input1Div.style.borderColor = "red";
                input1Div.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Up to 30 characters allowed</p>`);
            }
            else if (!/^[a-zA-Z0-9 ]+$/.test(input1.value)) {
                canSubmit = false;
                input1Div.style.borderColor = "red";
                input1Div.insertAdjacentHTML("beforeend", `<p id="error-msg" class="absolute right-[-1px] top-[-13.5px] px-[4px] rounded-tl-[8px] rounded-tr-[8px] border-t-1 border-r-1 after:absolute after:top-0 after:left-0 after:h-[60%] after:w-full after:border-l-1 after:border-[red] after:rounded-tl-[8px] bg-white text-[red] text-[14px] pointer-events-none">Name must be alphanumeric</p>`);
            }
        }
        return canSubmit;
    }
}
export { ValidateInput1 };
