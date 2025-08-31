import { SupaClient } from "./api/supaService.js";
import { UserBudgets } from "./user.js";
import { OptionsModal } from "./modals/options-modal.js";
import { EditAddModal } from "./modals/edit-add-modal.js";

// setTimeout(() => {}, 1000);

class BudgetPage {
  constructor() {
    this.chartContainer = document.getElementById('chart_container')
        this.summaryParent = ` <aside
          id="scheme"
          class="flex flex-col max-xl:flex-row max-xl:w-fit items-center p-8 h-auto pb-0 gap-8 bg-[white] rounded-[12px]"
        >
          <!-- cyrcle -->
          <div
            id="canvas_parent"
            class="relative h-[300px] w-[300px] max-xl:h-[240px] max-xl:w-[240px] flex justify-center items-center"
          >
          
          </div>
          <div id="spending_summary">
            <h3 class="text-xl font-semibold tracking-[0.01em] mb-6">
              Spending Summary
            </h3>
          
          </div>
        </aside>` 
        this.chartContainer.insertAdjacentHTML("afterbegin", this.summaryParent);
    this.elements = {
      themeDropdownParent: document.getElementById("theme_dropdown"),
      catDropdownParent: document.getElementById("category_dropdown"),
      catDropdown: document.getElementById("cat_dropdown"),
      themeDropdown: document.getElementById("col_dropdown"),
      //  addBtn: document.getElementById('add_new')
      showAddBudgetModal: document.getElementById("add_btn"),
      addBudgetModal: document.getElementById("add_budget"),
      editBudgetModal: document.getElementById("edit_budget"),
      chosenCat: document.getElementById("chosen_category"),
      chosenCol: document.getElementById("chosen_color"),
      chosenColBall: document.getElementById("color_ball"),
      canvasParent: document.getElementById("canvas_parent")
    };

    this.spentArr = [];
    this.colorsArr = [];
    this.dropDown(
      this.elements.themeDropdownParent,
      this.elements.themeDropdown
    );
    this.init();

    this.dropDown(this.elements.catDropdownParent, this.elements.catDropdown);
  }

  async init() {
    this.budgetsUser = new UserBudgets(SupaClient, () => {
      this.renderChart()
      this.getData(this.budgetsUser.userTrData, this.budgetsUser.userBData)
    });
    // await this.budgetsUser.setup()
  }

  setUpListeners() {
    this.elements.showAddBudgetModal.addEventListener("click", () => {
      this.elements.addBudgetModal.classList.replace("hidden", "flex");
      document.body.style.overflow = "hidden";
    });
  }

  // close modals
  checkClickedEle(event) {
    let clicked = event.target;

    if (
      clicked === this.elements.addBudgetModal ||
      clicked.id === "close_img"
    ) {
      this.elements.addBudgetModal.classList.replace("flex", "hidden");
      this.elements.catDropdown.classList.add("hidden");
      this.elements.themeDropdown.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
    if (
      clicked === this.elements.editBudgetModal ||
      clicked.id === "close_img"
    ) {
      this.elements.editBudgetModal.classList.replace("flex", "hidden");
    }
  }

  // dropdowns
  dropDown(parent, child) {
    parent.addEventListener("click", () => {
      parent.classList.toggle("border-[#98908B]");

      if (child.classList.contains("hidden")) {
        child.classList.replace("hidden", "flex");
      } else {
        child.classList.replace("flex", "hidden");
      }

      if (parent === this.elements.catDropdownParent) {
        this.elements.themeDropdown.classList.replace("flex", "hidden");
      }
    });
  }

  // choose category and theme
  chooseCat(event) {
    let clickedEle = event.target;
    let listItem = clickedEle.closest("li");

    if (!listItem) return;

    if (listItem.classList.contains("category")) {
      chosenCat.innerText = listItem.innerText;
    }
    if (listItem.classList.contains("color")) {
      let colorBall = listItem.querySelector("figure");
      let color = window.getComputedStyle(colorBall).backgroundColor;

      chosenCol.innerText = listItem.innerText;
      chosenColBall.style.backgroundColor = color;
    }
  }

  // managing transactions data
  transactionsByCategory(transactions) {
    let transactionsByCat = {};

    transactions.forEach((transaction) => {
      const date = transaction.date;
      const cat = transaction.category;
      const amount = transaction.amount;

      if (amount < 0) {
        if (!transactionsByCat[cat]) {
          transactionsByCat[cat] = 0; //if there is not category in transactionsByCat, line: it
        }
        transactionsByCat[cat] += amount;
      }
    });
    return transactionsByCat;
  }



  calculateBudgetStats(budgetsInfo, transactionsByCat) {
    // console.log(budgetsInfo);

    let totalSpending = 0;

    const result = budgetsInfo.map((budgetStat) => {
      const { category, maximum, theme, id } = budgetStat;
      const spent = Math.abs(transactionsByCat[category] || 0);

      totalSpending += spent;

      this.spentArr.push(spent);
      this.colorsArr.push(theme);

      let percent = Math.min((spent / maximum) * 100, 100);
      let remaining = maximum - spent < 0 ? 0 : maximum - spent;

      return { category, maximum, theme, spent, percent, remaining, id };
    });
    return result;
  }

  createSummaryBox({ category, spent, maximum, theme }) {
    return `
    
    <div id="summary_part" class="mt-2">
      <article id='category_box' class="flex flex-col w-[364px]">
        <div class="flex justify-between">
          <div class='flex'>
            <figure class="bg-[${theme}] w-1 h-[22px] mr-3 rounded-md"></figure>
            <h4 id='cat_title' class="text-[#696868]">${category}</h4>
          </div>
          <div class='flex'>
            <p class="mr-2 text-sm font-bold">$${spent}</p>
            <p class="text-[#696868] text-[12px]">of $<span>${maximum}.00</span></p>
          </div>
        </div>
        <figure id='summary_line' class="h-[1px] bg-[#f8f4f0] w-full mt-4 mb-3"></figure>
      </article>
    </div>`;
  }

  createBudgetBox({ category, spent, maximum, percent, remaining, theme, id }) {
    return `
    <article id="${id}" data-name="budget" class="w-[608px] h-[535px] p-8 bg-[white] rounded-[12px]">
      <div id='budget_box_parent' class="flex items-center">
      <div id="wrapper" class='flex items-center'>
        <figure class="w-4 h-4 rounded-4xl bg-[${theme}] mr-4"></figure>
        <h5 class="font-semibold text-xl mr-[357px]">${category}</h5>
      </div>
        <figure data-name="three_dots" class="text-2xl relative cursor-pointer">...
          
        </figure>
      </div>
      <div class="text-[#696868] text-lg mt-4 mb-5">Maximum of ${maximum}.00$</div>
      <div id='progress_bar' class="w-[544px] p-1 relative h-8 bg-[#F8F4F0] rounded-sm mb-5">
        <div style="width: ${percent}%;" class="h-6 bg-[${theme}] rounded-sm absolute"></div>
      </div>
      <div class="flex gap-[210px]">
        <div class="flex">
          <figure class="w-[5px] h-[43px] mr-4 bg-[${theme}] rounded-lg"></figure>
          <div><span class='text-xs text-[#696868]'>Spent</span><p class="font-semibold pt-1.5 text-sm">$${spent}</p></div>
        </div>
        <div class="flex">
          <figure class="w-[5px] h-[43px] bg-[#F8F4F0] rounded-lg mr-4"></figure>
          <div><span class='text-xs text-[#696868]'>Remaining</span><p class="font-semibold pt-1.5 text-sm">$${remaining}</p></div>
        </div>
      </div>
      <section data-name='parent_spendings' class="mt-5 p-5 bg-[#F8F4F0] h-[250px] rounded-[12px] gap-4">
        <div class="flex justify-between">
          <h6 class="font-semibold">Latest Spending</h6>
          <div data-name='see_all' class="flex gap-3 cursor-pointer">
            <div class="text-[#696868] text-[16px]">See All</div>
            <img src="../assets/images/icon-caret-right.svg" alt="">
          </div>
        </div>
      </section>
    </article>`;
  }


  renderBudgets(budgetStats, parentEle, spendingSummary) {
    console.log(budgetStats);
    // console.log(spendingSummary)

    budgetStats.forEach((stat) => {
      console.log('now');
      
      parentEle.innerHTML += this.createBudgetBox(stat);
      spendingSummary.innerHTML += this.createSummaryBox(stat);
    });
  }
  formateDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  addLastSpendings(trsInfo) {
    // take only the latest 3 spendings
    const latest = trsInfo.slice(0, 3);
    

    const lastSpendingHTML = latest
      .map(
        ({ avatar, amount, name, date }) => `
    <article>
      <div class="flex justify-between">
        <div class="flex items-center">
          <img src="${avatar}" class="mr-4" alt="">
          <p class="text-xs font-semibold">${name}</p>
        </div>
        <aside>
          <div class="font-semibold text-xs">${amount}$</div>
          <span class="text-[#696868] text-[12px]">${this.formateDate(
            date
          )}</span>
        </aside>
      </div>
      <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3 mb-3"></figure>
    </article>
  `
      )
      .join("");

    document
      .querySelectorAll('[data-name="parent_spendings"]')
      .forEach((parent) => {
        parent.innerHTML += lastSpendingHTML;
      });
  }

  openSmallMenu(budgetData) {
    const threeDots = document.querySelectorAll('[data-name="three_dots"]');
    threeDots.forEach((button) => {
      button.addEventListener("click", (e) => {
       if (e.target.closest('[data-name="three_dots"]')) {
          const btn = e.target.closest('[data-name="three_dots"]');
          const modalId = btn.closest('[data-name="budget"]')?.getAttribute("data-id");
          OptionsModal.open(budgetData, modalId, btn, 'budget');
        }

      });
    });

    document.addEventListener("click", () => {
      document
        .querySelectorAll('[data-name="edit_delete"]')
        .forEach((menu) => menu.classList.add("hidden"));
    });
  }

  initSeeAllButtons() {
    document.querySelectorAll('[data-name="see_all"]').forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = "transactions.html";
      });
    });
  }

  renderChart() {
  // create wrapper
  const canvasContainer = document.createElement("div");
  canvasContainer.id = "canvas_parent";
  canvasContainer.className =
    "relative h-[300px] w-[300px] max-xl:h-[240px] max-xl:w-[240px] flex justify-center items-center";

  // create canvas
  const canvas = document.createElement("canvas");
  canvas.id = "doughnut";

  // overlay div
  const overlay = document.createElement("div");
  overlay.id = "canvas_opacity";
  overlay.className =
    "bg-[#ffffff38] w-[230px] h-[230px] absolute top-10 rounded-full flex justify-center items-center flex-col";
  overlay.innerHTML = `
    <span id="spent_sum" class="font-bold text-[32px]"></span>
    <span id="total_sum" class="text-[12px] text-[#696868]"></span>
  `;

  // append children
  canvasContainer.appendChild(canvas);
  canvasContainer.appendChild(overlay);

  // put it at the very start of #scheme
  this.elements.canvasParent.appendChild(canvasContainer);

  // update ctx for Chart.js
  this.elements.ctx = canvas.getContext("2d");
}

  // chart
  chart(spentArr, colorsArr, ctx) {
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          { data: spentArr, borderWidth: 0, backgroundColor: colorsArr },
        ],
      },
      options: { cutout: "68%", responsive: true, maintainAspectRatio: false },
    });
  }

  // managing json data
  getData = async (trsData, budgetsData) => {
    let parentEle = document.querySelector("#budgets_parent");
    let spendingSummary = document.querySelector("#spending_summary");
    let totalSum = document.querySelector("#total_sum");
    let spentSum = document.querySelector("#spent_sum");

    const transactionsByCat = this.transactionsByCategory(trsData);
    // console.log(transactionsByCat);
    // console.log(budgets);
    const budgetStats = this.calculateBudgetStats(
      budgetsData,
      transactionsByCat
    );

    this.renderBudgets(budgetStats, parentEle, spendingSummary);

    const spentArray = budgetStats.map((stat) => stat.spent);
    const colorsArray = budgetStats.map((stat) => stat.theme);

    this.openSmallMenu(budgetStats);
    this.addLastSpendings(trsData);
    this.initSeeAllButtons();
    // this.renderChart()
    this.chart(spentArray, colorsArray, this.elements.ctx);

    totalSum.textContent = `of $${budgetsData.reduce(
      (sum, b) => sum + b.maximum,
      0
    )} limit`;
    spentSum.textContent = `$${budgetStats.reduce(
      (sum, b) => sum + b.spent,
      0
    )}`;
  };
}

new BudgetPage();
