class ClickOutClose {
  static handle(modal: HTMLElement, animation: string, timeout: number, wrapper: HTMLElement | null = null): void {
    setTimeout(() => {
      function handleClick(e: MouseEvent) {
        if (!modal.contains(e.target as Node)) {
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
}

export { ClickOutClose };
