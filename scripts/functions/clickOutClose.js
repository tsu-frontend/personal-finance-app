function clickOutClose(modal, animation, timeout, wrapper = null) {
  document.addEventListener("click", function (e) {
    if (!modal.contains(e.target)) {
      if (wrapper) {
        wrapper.classList.add(animation);
        setTimeout(() => {
          wrapper.remove();
          document.body.classList.remove("overflow-hidden");
        }, timeout);
      } else {
        modal.classList.add(animation);
        setTimeout(() => {
          modal.remove();
        }, timeout);
      }
    }
  });
}

export { clickOutClose };
