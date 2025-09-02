class BudgetsFirstInput {
  static render(name: string): string {
    return `
<div id="input-3" class="select-none relative hover:cursor-pointer w-full flex items-center gap-[12px] px-[20px] h-[48px] border-1 border-[#98908B] rounded-[8px]"><span class=" w-[16px] h-[16px] rounded-full" style="background: #277C78"></span>
<p class="text-[#201F24] text-[14px] font-normal">Green</p><img src="../assets/images/icon-caret-down.svg" class="ml-auto"></div>
</div>

    `;
  }
}

export { BudgetsFirstInput };

