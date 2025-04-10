document.addEventListener("DOMContentLoaded", () => {
  const minimize = document.querySelector("#minimize");

  minimize.disabled = false;

  minimize.addEventListener("click", () => {
    if (minimize.disabled) return;
    minimize.disabled = true;
    setTimeout(() => {
      minimize.disabled = false;
    }, 400);

    // nav
    const nav = document.querySelector("nav");
    nav.classList.toggle("xl:w-[min(20.83%,300px)]");
    nav.classList.toggle("xl:w-[85px]");
    nav.classList.add("xl:pr-[4px]");
    nav.classList.remove("xl:pr-[24px]");

    if (!nav.classList.contains("xl:w-[85px]")) {
      setTimeout(() => {
        nav.classList.remove("xl:pr-[4px]");
        nav.classList.add("xl:pr-[24px]");
      }, 20);
    }

    // anchors
    const anchors = document.querySelectorAll("#overview, #transactions, #budgets, #pots, #recurring-bills");
    anchors.forEach((anchor) => {
      anchor.classList.toggle("xl:w-fit");
    });

    // minimize button
    const minimizeSvg = minimize.querySelector("svg");
    minimizeSvg.classList.toggle("rotate-180");

    // p elements
    const navP = nav.querySelectorAll("p");
    if (nav.classList.contains("xl:w-[85px]")) {
      navP.forEach((p) => p.classList.add("xl:hidden"));
    } else {
      setTimeout(() => {
        navP.forEach((p, index) => {
          setTimeout(() => {
            p.classList.remove("xl:hidden");
          }, index * 50);
        });
      }, 100);
    }

    // logo letters
    const letters = document.querySelectorAll("#logo-letter");
    letters[0].classList.toggle("fill-[#201F24]");
    letters[0].classList.toggle("scale-200");
    letters[0].classList.remove("animate-letters");
    letters[0].classList.toggle("translate-y-[-10px]");
    if (letters[0].hasAttribute("stroke")) {
      letters[0].removeAttribute("stroke");
      letters[0].removeAttribute("stroke-width");
    } else {
      letters[0].setAttribute("stroke", "white");
      letters[0].setAttribute("stroke-width", "1");
    }
    letters.forEach((letter, index) => {
      if (index !== 0) {
        setTimeout(() => {
          letter.classList.toggle("hidden");
        }, index * 50);
      }
    });
  });
});
