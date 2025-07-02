function clickOutClose(modal, animation, timeout, wrapper = null) {
  // timeout ensures the first outside click (that toggles the modal) isnt counted
  setTimeout(() => {
    function handleClick(e) {
      if (!modal.contains(e.target)) {
        if (wrapper) {
          wrapper.classList.add(animation);
          setTimeout(() => {
            wrapper.remove();
            document.body.classList.remove("overflow-hidden");
            document.removeEventListener("click", handleClick);
          }, timeout);
        } else {
          modal.classList.add(animation);
          setTimeout(() => {
            modal.remove();
            document.removeEventListener("click", handleClick);
          }, timeout);
        }
      }
    }
    document.addEventListener("click", handleClick);
  }, 1);
}

export { clickOutClose };
