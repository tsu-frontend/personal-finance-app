function clickOutClose(modal, animation, timeout) {
  document.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) {
      modal.classList.add(animation);
      setTimeout(() => {
        modal.remove();
      }, timeout);
    }
  });
}

export { clickOutClose };
