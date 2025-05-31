function openEditModal(modalId) {
  const data = JSON.parse(localStorage.getItem("data") || "[]");
  const modalData = data.find((modal) => modal.id === modalId);

  console.log(modalId);
}

// function appendEditModal(chosenTheme, renderData, tableName, fetchInfo) {
//   if (!optionsModal.classList.contains("hidden")) {
//     optionsModal.classList.add("animate-close");
//     setTimeout(() => {
//       optionsModal.classList.add("hidden");
//       optionsModal.classList.remove("flex", "animate-close");
//     }, 100);
//   }
//   const firstInput = `
//         <div class="w-full flex flex-col gap-[4px]">
//           <p class="w-full text-[#696868] text-[12px] font-bold leading-[150%]">Pot Name</p>
//           <div id="input-div-1" class="w-full px-[20px] py-[12px] flex items-center rounded-[8px] border-1 border-[#98908B] relative">
//             <input id="input-1" type="text" placeholder="e.g. Rainy Days" class="hover:cursor-pointer h-[21px] w-full relative focus:outline-none" value="${potData.name}" />
//           </div>
//           <p id="characters-left" class="w-full text-[#696868] text-[12px] font-normal leading-[150%] text-right"></p>
//         </div>
//       `;
//   const modalInfo = {
//     tableName: "pots",
//     modalData: potData,
//     modalId: potId,
//     item: pots,
//     firstInput,
//     title: "Edit Pot",
//     subTitle: "If your saving targets change, feel free to update your pots.",
//     field2Title: "Target",
//     buttonText: "Save Changes",
//     modalType: "edit",
//   };
//   const fetchInfo = {
//     fetchValue1: { key: "name", value: () => document.querySelector("#input-1").value },
//     fetchValue2: "target",
//     fetchValue3: { key: "total", value: () => 0 },
//   };
//   openEditAddModal(modalInfo, fetchInfo, validateInput1, renderData);

//   // input1 logic
//   // const input1 = document.querySelector("#input-1");
//   // const charsLeft = 30 - input1.value.length;
//   // const counter = document.querySelector("#characters-left");
//   // counter.textContent = `${charsLeft} characters left`;
//   // input1.addEventListener("input", () => validateInput1());
// }

export { openEditModal };
