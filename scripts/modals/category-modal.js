import { ClickOutClose } from "../utilities/clickOutClose.js";
import { categories } from "../constants/categories.js";
class CategoryModal {
    static open(chosenCategory, setChosenCategory) {
        const categoryButton = document.querySelector("#input-1");
        if (categoryButton.querySelector("#category-modal"))
            return;
        const existingModal = document.querySelector("#category-modal-wrapper");
        if (existingModal)
            existingModal.remove();
        const categoryBlocks = Object.entries(categories)
            .map(([id, name]) => {
            return `
          <div id="${id}" class="group shrink-0 hover:cursor-pointer hover:scale-y-[1.2] transition-all duration-300 ease transform-gpu w-full h-[45px] flex gap-[12px] items-center">
            <p class="text-[#201F24] text-[14px] leading-[150%] group-hover:scale-x-[1.2] group-hover:ml-[6px] transition-all duration-300 ease transform-gpu">${name}</p>
          </div>
          <span class="w-full h-[1px] shrink-0 bg-[#F2F2F2]"></span>
        `;
        })
            .join("");
        categoryButton.insertAdjacentHTML("beforeend", `<div id="category-modal-wrapper" class="z-1 animate-theme-open cursor-auto max-h-[300px] [@media(900px>=height)]:max-h-[200px] [&::-webkit-scrollbar]:hidden overflow-y-auto rounded-[8px] bg-[#FFF] absolute left-[-1px] top-[64px] w-[calc(100%+2px)] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
        <div id="category-modal" class="h-full [@media(700px>=height)]:h-[100px] w-full flex flex-col px-[20px]">
          ${categoryBlocks}
        </div>
      </div>`);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const categoryModal = document.querySelector("#category-modal");
        Array.from(categoryModal.children).forEach((category) => {
            if (category.tagName === "DIV") {
                category.addEventListener("click", () => {
                    const chosenCategory = category.id;
                    //   do validation here
                    setChosenCategory(chosenCategory);
                    const categoryModalWrapper = document.querySelector("#theme-modal-wrapper");
                    categoryModalWrapper.classList.add("animate-theme-close");
                    setTimeout(() => {
                        categoryModalWrapper.classList.add("hidden");
                        categoryModalWrapper.classList.remove("animate-theme-close");
                    }, 300);
                    const input3 = document.querySelector("#input-3");
                    if (input3) {
                        const span = input3.querySelector("span");
                        const p = input3.querySelector("p");
                        if (span) {
                            span.classList.remove("animate-color");
                            span.style.background = chosenCategory;
                        }
                        if (p && categories) {
                            p.textContent = categories[chosenCategory];
                        }
                    }
                });
            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const categoryModalWrapper = document.querySelector("#category-modal-wrapper");
        categoryModalWrapper.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        ClickOutClose.handle(categoryModalWrapper, "animate-theme-close", 300);
    }
}
export { CategoryModal };
