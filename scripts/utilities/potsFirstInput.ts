class PotsFirstInput {
  static render(name: string): string {
    return `
      <div class="w-full flex flex-col gap-[4px]">
        <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
        <div id="input-div-1" class="w-full px-[20px] py-[12px] flex items-center rounded-[8px] border-1 border-[#98908B] relative">
          <input id="input-1" type="text" placeholder="e.g. Rainy Days" class="hover:cursor-pointer h-[21px] w-full relative focus:outline-none" value="${name}" />
        </div>
        <p id="characters-left" class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right"></p>
      </div>
    `;
  }
}

export { PotsFirstInput };
