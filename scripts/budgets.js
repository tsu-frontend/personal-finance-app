const ctx = document.getElementById('doughnut');
const themeDropdownParent = document.getElementById('theme_dropdown')
const catDropdownParent = document.getElementById('category_dropdown')
const catDropdown = document.getElementById('cat_dropdown')
const themeDropdown = document.getElementById('col_dropdown')
//  const addBtn = document.getElementById('add_new')
const showAddBudgetModal = document.getElementById('add_btn')
const addBudgetModal = document.getElementById('add_budget')
const editBudgetModal = document.getElementById('edit_budget')
const chosenCat = document.getElementById('chosen_category')
const chosenCol = document.getElementById('chosen_color')
const chosenColBall = document.getElementById('color_ball')

// const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`
// const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`

// const client = supabase.createClient(SUPABASE_URL, PUBLIC_KEY)
// console.log(client)



// open modals
showAddBudgetModal.addEventListener('click', () => {
  addBudgetModal.classList.replace('hidden', 'flex')
  document.body.style.overflow = 'hidden'
})

// close modals
function checkClickedEle(event) {
  let clicked = event.target

  if (clicked === addBudgetModal || clicked.id === 'close_img') {
    addBudgetModal.classList.replace('flex', 'hidden')
    catDropdown.classList.add('hidden')
    themeDropdown.classList.add('hidden')
    document.body.style.overflow = 'auto'
  }
  if (clicked === editBudgetModal || clicked.id === 'close_img') {
    editBudgetModal.classList.replace('flex', 'hidden')
  }
}



// dropdowns
function dropDown(parent, child) {
  parent.addEventListener('click', () => {
    parent.classList.toggle('border-[#98908B]')

    if (child.classList.contains('hidden')) {

      child.classList.replace('hidden', 'flex')
    } else {
      child.classList.replace('flex', 'hidden')
    }

    if (parent === catDropdownParent) {
      themeDropdown.classList.replace('flex', 'hidden')
    }
  })
}

dropDown(catDropdownParent, catDropdown)
dropDown(themeDropdownParent, themeDropdown)


// choose category and theme
function chooseCat(event) {
  let clickedEle = event.target
  let listItem = clickedEle.closest('li')

  if (!listItem) return;

  if (listItem.classList.contains('category')) {
    chosenCat.innerText = listItem.innerText
  }
  if (listItem.classList.contains('color')) {
    let colorBall = listItem.querySelector('figure')
    let color = window.getComputedStyle(colorBall).backgroundColor

    chosenCol.innerText = listItem.innerText;
    chosenColBall.style.backgroundColor = color;
  }
}

let spentArr = []
let colorsArr = []


// managing json data
const getData = async () => {

  const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`
  const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`

  const responseTransactions = await fetch(`${SUPABASE_URL}/rest/v1/transactions`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PUBLIC_KEY,
        'Authorization': `Bearer ${PUBLIC_KEY}`,
        'Prefer': 'return=representation'
      },
    })
  const trsData = await responseTransactions.json()

  // console.log(trsData)

  const responseBudgets = await fetch(`${SUPABASE_URL}/rest/v1/budgets`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PUBLIC_KEY,
        'Authorization': `Bearer ${PUBLIC_KEY}`,
        'Prefer': 'return=representation'
      },
    })
  const budgetsData = await responseBudgets.json()
  // console.log(budgetsData)



  let parentEle = document.querySelector('#budgets_parent')
  let spendingSummary = document.querySelector('#spending_summary')
  let totalSum = document.querySelector('#total_sum')
  let spentSum = document.querySelector('#spent_sum')



  // managing transactions data 
  let transactionsByCat = {}

  trsData.forEach(transaction => {
    const date = transaction.date
    const cat = transaction.category
    const amount = transaction.amount

    if (amount < 0) {
      if (!transactionsByCat[cat]) {
        transactionsByCat[cat] = 0 //if there is not category in transactionsByCat, this line creates it 
      }
      transactionsByCat[cat] += amount
    }
  })
console.log(transactionsByCat)

  // console.log(budgets);
  let totalSpending = 0

  budgetsData.forEach(object => {
    const { category, maximum, theme } = object
    const spent = Math.abs(transactionsByCat[category] || 0)

    totalSpending += spent

    spentArr.push(spent)
    colorsArr.push(theme)



    let procent = Math.min((spent / maximum) * 100, 100);
    let remaining = (maximum - spent) < 0 ? 0 : (maximum - spent);


    // add budget boxes dynamically
    let summaryBox = `
      <div id="spending_summary" class="mt-2">

            <article class="flex flex-col w-[364px]">
            <div data-name="container" class="flex justify-between">
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


      </div>`


    let budgetBox = ` <article data-name="budget" class="w-[608px] h-[535px] p-8 bg-[white] rounded-[12px]">
            <div data-name="budget_heading" class="flex items-center">
              <figure class="w-4 h-4 rounded-4xl bg-[${theme}] mr-4"></figure>
              <h5 class="font-semibold text-xl mr-[357px]">${category}</h5>
              <figure data-name="three_dots" class="text-2xl relative tracking-[-0.06em] text-[#B3B3B3] pb-2 ml-auto cursor-pointer">...
              
              <div data-name="edit_delete" class='hidden w-[134px] h-[91px] text-black bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] pt-3 pb-3 pl-5 pr-5 absolute z-20 top-11 right-0 rounded-lg text-sm cursor-auto'>
              <p class='tracking-[-0.2px] cursor-pointer'>Edit Budget</p>
              <figure class="h-[1px] bg-[#d5cfcf] w-full mt-3 mb-3"></figure>
              <p class='text-[#C94736] tracking-[-0.2px] cursor-pointer'>Delete Budget</p>
              </div>

              </figure>
            </div>

            <div class="text-[#696868] text-lg mt-4 mb-5">Maximum of ${maximum}.00$</div>

           <div class="w-[544px] p-1 relative h-8 bg-[#F8F4F0] rounded-sm  mb-5" >
           <div data-name="progress" style="width: ${procent}%;" class="h-6 bg-[${theme}] rounded-sm absolute transition-all duration-300 "></div>
           </div>

          <div data-name="spent_remaining" class="flex gap-[210px]">

            <div class="flex">
              <figure class="w-[5px] h-[43px] mr-4 bg-[${theme}] rounded-lg"></figure>
              <div data-name="spent">
                <span class="text-[#696868]">Spent</span>
                <p class="font-semibold pt-1.5">$${spent}</p>
              </div>
            </div>

            <div class="flex">
              <figure class="w-[5px] h-[43px] bg-[#F8F4F0] rounded-lg mr-4"></figure>
              <div data-name="remain" class="flex flex-col">
                <span class="text-[#696868]">Remaining</span>
                <p class="font-semibold pt-1.5">$${remaining}</p>
              </div>
            </div>

          </div>

<!-- latest spending -->
           <section data-name='parent_spendings' class="flex flex-col mt-5 p-5 pb-1 bg-[#F8F4F0] h-[250px] rounded-[12px] gap-4">

          <div class="flex justify-between">
            <h6 class="font-semibold">Latest Spending</h6>
            <div data-name='see_all' class="flex gap-3 cursor-pointer">
              <div class="text-[#696868] text-[16px]">See All</div>
              <img src="../assets/images/icon-caret-right.svg" alt="">
            </div>
          </div>

           </section>
           </article>`

    parentEle.innerHTML += budgetBox
    spendingSummary.innerHTML += summaryBox
  });
  let lastSpending = `         
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
    </article>`


  // chart
  const cyrcle = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "# of Votes",
          data: spentArr,
          borderWidth: 0,
          backgroundColor: colorsArr,
        },
      ],
    },
    options: {
      cutout: "68%",
      responsive: true,
    },
  });

  // open and close small menu
  const threeDots = document.querySelectorAll('[data-name="three_dots"]')

  threeDots.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const editOrDelete = button.querySelector('[data-name="edit_delete"]')
      const isAlreadyOpen = editOrDelete && !editOrDelete.classList.contains('hidden')

      document.querySelectorAll('[data-name="edit_delete"]').forEach((menu) => {
        menu.classList.add('hidden')
      })

      if (editOrDelete && !isAlreadyOpen) {
        editOrDelete.classList.remove('hidden');
      }
    })
  })

  document.addEventListener('click', (e) => {
    document.querySelectorAll('[data-name="edit_delete"]').forEach((menu => {
      if (!menu.contains(e.target) || e.target === threeDots) {
        menu.classList.add('hidden');
      }
    }))

  })

  // add last spendings
  let oneSpending = document.querySelectorAll('[data-name="parent_spendings"]')
  oneSpending.forEach(parent => {
    for (let i = 0; i < 3; i++) {
      parent.innerHTML += lastSpending
    }
  })

  // see all - redirect to transactions page
  const seeAllBtns = document.querySelectorAll('[data-name="see_all"]')

  seeAllBtns.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = "transactions.html"
    })

    // chart spendings
     let SUM = 0
    for (let i = 0; i < budgetsData.length; i++) {
      SUM += budgetsData[i].maximum
    }

    totalSum.textContent = `of $${SUM} limit`
    spentSum.textContent = `$${parseInt(totalSpending)}`
  })


}

getData()