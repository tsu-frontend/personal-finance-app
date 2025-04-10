const ctx = document.getElementById("doughnut");
const cyrcle = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        label: "# of Votes",
        data: [15, 150, 133, 40],
        borderWidth: 0,
        backgroundColor: ["#277C78", "#82C9D7", "#F2CDAC", "#626070"],
      },
    ],
  },
  options: {
    cutout: "68%",
    responsive: true,
  },
});

const getData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();
  const budgets = data.budgets;
  console.log(budgets);
  let parentEle = document.querySelector("#budgets_parent");

  budgets.forEach((object) => {
    const { category, maximum, theme } = object;

    let budgetBox = ` <article data-name="budget" class="w-[608px] h-[510px] p-8 bg-[white] rounded-[12px]">
            <div data-name="budget_heading" class="flex items-center">
              <figure class="w-4 h-4 rounded-4xl bg-[#277C78] mr-4"></figure>
              <h5 class="font-semibold text-xl mr-[357px]">Entertainment</h5>
              <figure data-name="three_dots" class="text-2xl tracking-[-0.06em] text-[#B3B3B3] pb-2">...</figure>
            </div>
            <div class="text-[#696868] text-lg mt-4 mb-5">Maximum of $50.00</div>
           <div data-name="line" class="w-[544px] h-8 bg-[#F8F4F0] rounded-sm  mb-5" ></div>
          <div data-name="spent_remaining" class="flex gap-[210px]">
            <div class="flex">
              <figure data-name="color_changing" class="w-[5px] h-[43px] mr-4 bg-[#277C78] rounded-lg"></figure>
              <div data-name="spent">
                <span class="text-[#696868]">Spent</span>
                <p class="font-semibold pt-1.5">$15.00</p>
              </div>
            </div>
            <div class="flex">
              <figure class="w-[5px] h-[43px] bg-[#F8F4F0] rounded-lg mr-4"></figure>
              <div data-name="remain" class="flex flex-col">
                <span class="text-[#696868]">Remaining</span>
                <p class="font-semibold pt-1.5">$35.00</p>
              </div>
            </div>
          </div>
<!-- latest spending -->
           <section class="flex flex-col mt-5 p-4 pb-1 bg-[#F8F4F0] rounded-md gap-4">
          <div class="flex justify-between">
            <h6 class="font-semibold">Latest Spending</h6>
            <div class="flex gap-3">
              <div class="text-[#696868]">See All</div>
              <img src="../assets/images/icon-caret-right.svg" alt="">
            </div>
          </div>
          <article>
            <div class="flex justify-between">
              <div class="flex items-center">
              <img src="../assets/images/Ellipse 13.png" class="mr-4" alt="">
              <p class="text-sm font-semibold">Spark Electric Solutions</p>
              </div>
              <aside>
                <div class="font-semibold text-sm">-$100.00</div>
                <span class="text-[#696868] flex text-[12px]">2 Aug 2024</span>
              </aside>
            </div>
            <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3 mb-0"></figure>
          </article>
          <article>
            <div class="flex justify-between">
              <div class="flex items-center">
              <img src="../assets/images/Ellipse 13.png" class="mr-4" alt="">
              <p class="text-sm font-semibold">Spark Electric Solutions</p>
              </div>
              <aside>
                <div class="font-semibold text-sm">-$100.00</div>
                <span class="text-[#696868] flex text-[12px]">2 Aug 2024</span>
              </aside>
            </div>
            <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3 mb-0"></figure>
          </article>
          <article>
            <div class="flex justify-between">
              <div class="flex items-center">
              <img src="../assets/images/Ellipse 13.png" class="mr-4" alt="">
              <p class="text-sm font-semibold">Spark Electric Solutions</p>
              </div>
              <aside>
                <div class="font-semibold text-sm">-$100.00</div>
                <span class="text-[#696868] flex text-[12px]">2 Aug 2024</span>
              </aside>
            </div>
            <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3 mb-0"></figure>
          </article>
           </section>
           </article>`;

    parentEle.innerHTML += budgetBox;
  });
};

getData();
