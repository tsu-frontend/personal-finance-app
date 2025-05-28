function appendModal1(pots, performDeletePot, performEditPot) {
  document.querySelectorAll('[data-name="pot"]').forEach((pot) => {
    const optionsButton = pot.querySelector('[data-name="pot-options"]');
    const optionsModal = pot.querySelector('[data-name="pot-options-modal"]');
    let potId = pot.getAttribute("data-id");
    const potData = pots.find((item) => item.id === potId);

    optionsButton.addEventListener("click", () => {
      optionsModal.classList.add("animate-close");
      setTimeout(() => {
        optionsModal.classList.toggle("hidden");
        optionsModal.classList.toggle("flex");
        optionsModal.classList.remove("animate-close");
      }, 100);
    });
    document.addEventListener("click", () => {
      if (optionsModal.classList.contains("flex")) {
        optionsModal.classList.add("animate-close");
        setTimeout(() => {
          optionsModal.classList.add("hidden");
          optionsModal.classList.remove("flex", "animate-close");
        }, 100);
      }
    });
    optionsModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    performDeletePot(pot, potData, potId);
    performEditPot(pot, potData, potId);
  });
}

export { appendModal1 };
