import { ServiceManager } from "https://esm.sh/supabase-service-manager";
import { UserBudgets } from "./user.js";

export const SupaClient = new ServiceManager({
  supabase: {
    url: "https://dhpewqtvbasnugkfiixs.supabase.co",
    anonKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk",
  },
});

const budgetsUser = new UserBudgets(SupaClient);

setTimeout(() => {
  getData(budgetsUser.userTrData, budgetsUser.userBData);
}, 1000);

const ctx = document.getElementById("doughnut");
const themeDropdownParent = document.getElementById("theme_dropdown");
const catDropdownParent = document.getElementById("category_dropdown");
const catDropdown = document.getElementById("cat_dropdown");
const themeDropdown = document.getElementById("col_dropdown");
//  const addBtn = document.getElementById('add_new')
const showAddBudgetModal = document.getElementById("add_btn");
const addBudgetModal = document.getElementById("add_budget");
const editBudgetModal = document.getElementById("edit_budget");
const chosenCat = document.getElementById("chosen_category");
const chosenCol = document.getElementById("chosen_color");
const chosenColBall = document.getElementById("color_ball");

// const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`
// const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`

// const client = supabase.createClient(SUPABASE_URL, PUBLIC_KEY)
// console.log(client)


console.log(document.referrer);

// SupaClient.getCurrentUser().then((res) => {
//   if (res.success) {
//     signOutBtn.style.display = "block";
//     const currentUser = new User(res.data);
//     console.log(currentUser)
//   } else {
//     signInForm.style.display = "flex"; //??
//   }
// });

// open modals
showAddBudgetModal.addEventListener("click", () => {
  addBudgetModal.classList.replace("hidden", "flex");
  document.body.style.overflow = "hidden";
});

// close modals
function checkClickedEle(event) {
  let clicked = event.target;

  if (clicked === addBudgetModal || clicked.id === "close_img") {
    addBudgetModal.classList.replace("flex", "hidden");
    catDropdown.classList.add("hidden");
    themeDropdown.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
  if (clicked === editBudgetModal || clicked.id === "close_img") {
    editBudgetModal.classList.replace("flex", "hidden");
  }
}

// dropdowns
function dropDown(parent, child) {
  parent.addEventListener("click", () => {
    parent.classList.toggle("border-[#98908B]");

    if (child.classList.contains("hidden")) {
      child.classList.replace("hidden", "flex");
    } else {
      child.classList.replace("flex", "hidden");
    }

    if (parent === catDropdownParent) {
      themeDropdown.classList.replace("flex", "hidden");
    }
  });
}

dropDown(catDropdownParent, catDropdown);
dropDown(themeDropdownParent, themeDropdown);

// choose category and theme
function chooseCat(event) {
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

let spentArr = [];
let colorsArr = [];

// managing transactions data
function transactionsByCategory(transactions) {
  let transactionsByCat = {};

  transactions.forEach((transaction) => {
    const date = transaction.date;
    const cat = transaction.category;
    const amount = transaction.amount;

    if (amount < 0) {
      if (!transactionsByCat[cat]) {
        transactionsByCat[cat] = 0; //if there is not category in transactionsByCat, this line creates it
      }
      transactionsByCat[cat] += amount;
    }
  });
  return transactionsByCat;
}

function calculateBudgetStats(budgetsInfo, transactionsByCat){
  // console.log(budgetsInfo);
  
let totalSpending = 0;

 const result = budgetsInfo.map((budgetStat) => {
    const { category, maximum, theme } = budgetStat;
    const spent = Math.abs(transactionsByCat[category] || 0);

    totalSpending += spent;

    spentArr.push(spent);
    colorsArr.push(theme);

    let procent = Math.min((spent / maximum) * 100, 100);
    let remaining = maximum - spent < 0 ? 0 : maximum - spent;

    return {category, maximum, theme, spent, procent, remaining}
  })
return result
}


function createSummaryBox({ category, spent, maximum, theme }) {
  return `
    <div id="spending_summary" class="mt-2">
      <article class="flex flex-col w-[364px]">
        <div class="flex justify-between">
          <div class='flex'>
            <figure class="bg-[${theme}] w-1 h-[22px] mr-3 rounded-md"></figure>
            <h4 class="text-[#696868]">${category}</h4>
          </div>
          <div class='flex'>
            <p class="mr-2 text-sm font-bold">$${spent}</p>
            <p class="text-[#696868] text-[12px]">of $<span>${maximum}.00</span></p>
          </div>
        </div>
        <figure class="h-[1px] bg-[#f8f4f0] w-full mt-4 mb-3"></figure>
      </article>
    </div>`;
}

function createBudgetBox({ category, spent, maximum, procent, remaining, theme }) {
  return `
    <article data-name="budget" class="w-[608px] h-[535px] p-8 bg-[white] rounded-[12px]">
      <div class="flex items-center">
        <figure class="w-4 h-4 rounded-4xl bg-[${theme}] mr-4"></figure>
        <h5 class="font-semibold text-xl mr-[357px]">${category}</h5>
        <figure data-name="three_dots" class="text-2xl relative cursor-pointer">...
          <div data-name="edit_delete" class='hidden absolute z-20 bg-white rounded-lg shadow-md'>
            <p>Edit Budget</p>
            <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3 mb-3"></figure>
            <p class='text-[#C94736]'>Delete Budget</p>
          </div>
        </figure>
      </div>
      <div class="text-[#696868] text-lg mt-4 mb-5">Maximum of ${maximum}.00$</div>
      <div class="w-[544px] p-1 relative h-8 bg-[#F8F4F0] rounded-sm mb-5">
        <div style="width: ${procent}%;" class="h-6 bg-[${theme}] rounded-sm absolute"></div>
      </div>
      <div class="flex gap-[210px]">
        <div class="flex">
          <figure class="w-[5px] h-[43px] mr-4 bg-[${theme}] rounded-lg"></figure>
          <div><span>Spent</span><p class="font-semibold pt-1.5">$${spent}</p></div>
        </div>
        <div class="flex">
          <figure class="w-[5px] h-[43px] bg-[#F8F4F0] rounded-lg mr-4"></figure>
          <div><span>Remaining</span><p class="font-semibold pt-1.5">$${remaining}</p></div>
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

function renderBudgets(budgetStats, parentEle, spendingSummary) {
  budgetStats.forEach(stat => {
    parentEle.innerHTML += createBudgetBox(stat);
    spendingSummary.innerHTML += createSummaryBox(stat);
  });
}

function addLastSpendings(trsInfo) {
  // take only the latest 3 spendings
  const latest = trsInfo.slice(0, 3);

  const lastSpendingHTML = latest.map(({ avatar, amount, name, date }) =>  `
    <article>
      <div class="flex justify-between">
        <div class="flex items-center">
          <img src="" class="mr-4" alt="">
          <p class="text-sm font-semibold">${name}</p>
        </div>
        <aside>
          <div class="font-semibold text-sm">${amount}$</div>
          <span class="text-[#696868] text-[12px]">${date}</span>
        </aside>
      </div>
      <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3"></figure>
    </article>
  `).join('');

  document.querySelectorAll('[data-name="parent_spendings"]').forEach(parent => {
    parent.innerHTML += lastSpendingHTML;
  });
}

function openSmallMenu() {
  const threeDots = document.querySelectorAll('[data-name="three_dots"]');
  threeDots.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const editOrDelete = button.querySelector('[data-name="edit_delete"]');
      const isAlreadyOpen = !editOrDelete.classList.contains('hidden');
      document.querySelectorAll('[data-name="edit_delete"]').forEach(menu => menu.classList.add('hidden'));
      if (!isAlreadyOpen) editOrDelete.classList.remove('hidden');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('[data-name="edit_delete"]').forEach(menu => menu.classList.add('hidden'));
  });
}

function initSeeAllButtons() {
  document.querySelectorAll('[data-name="see_all"]').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = "transactions.html";
    });
  });
}


  // chart
function chart(spentArr, colorsArr, ctx) {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [{ data: spentArr, borderWidth: 0, backgroundColor: colorsArr }],
    },
    options: { cutout: "68%", responsive: true },
  });
}


// managing json data
const getData = async (trsData, budgetsData) => {
  let parentEle = document.querySelector("#budgets_parent");
  let spendingSummary = document.querySelector("#spending_summary");
  let totalSum = document.querySelector("#total_sum");
  let spentSum = document.querySelector("#spent_sum");


 const transactionsByCat = transactionsByCategory(trsData)
  // console.log(budgets);
  
const budgetStats = calculateBudgetStats(budgetsData, transactionsByCat )
// console.log(budgetStats)


renderBudgets(budgetStats, parentEle, spendingSummary);

  const spentArr = budgetStats.map(stat => stat.spent);
  const colorsArr = budgetStats.map(stat => stat.theme);

  openSmallMenu();
  addLastSpendings(trsData);
  initSeeAllButtons();
  chart(spentArr, colorsArr, ctx);

  totalSum.textContent = `of $${budgetsData.reduce((sum, b) => sum + b.maximum, 0)} limit`;
  spentSum.textContent = `$${budgetStats.reduce((sum, b) => sum + b.spent, 0)}`;
}
   


