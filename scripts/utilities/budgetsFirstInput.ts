class BudgetsFirstInput {
  static render(category: string): string {
    return `

      <div id="input-1" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]">
        <p class="text-[#201F24] text-[14px] font-normal">${category}</p><img src="../assets/images/icon-caret-down.svg" class="ml-auto">
      </div>

    `;
  }
}

export { BudgetsFirstInput };
