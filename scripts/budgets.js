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


// cyrcle chart
 const cyrcle = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: '# of Votes',
        data: [15, 150, 133, 40],
        borderWidth: 0,
        backgroundColor: [
           '#277C78',
           '#82C9D7',
           '#F2CDAC',
           '#626070',

        ]
      }]
    },
    options: {
        cutout: '68%', 
        responsive: true,
    }
  });

// open modals
showAddBudgetModal.addEventListener('click', () =>{
addBudgetModal.classList.replace('hidden', 'flex')
document.body.style.overflow = 'hidden'
})

// close modals
function checkClickedEle(event){
  let clicked = event.target 

    if(clicked === addBudgetModal || clicked.id === 'close_img'){
      addBudgetModal.classList.replace('flex', 'hidden')
      catDropdown.classList.add('hidden')
      themeDropdown.classList.add('hidden')
      document.body.style.overflow = 'auto'
      }
    if(clicked === editBudgetModal || clicked.id === 'close_img'){
      editBudgetModal.classList.replace('flex', 'hidden')
      }
}



// dropdowns
function dropDown(parent, child){
  parent.addEventListener('click', () =>{
    parent.classList.toggle('border-[#98908B]')

    if(child.classList.contains('hidden')){

      child.classList.replace('hidden', 'flex')
    }else{
      child.classList.replace('flex', 'hidden')
    }

    if(parent === catDropdownParent){
      themeDropdown.classList.replace('flex', 'hidden')
    }
  })
}

dropDown(catDropdownParent, catDropdown)
dropDown(themeDropdownParent, themeDropdown)


// choose category and theme
function chooseCat(event){
 let clickedEle = event.target
 let listItem = clickedEle.closest('li')

 if(!listItem) return; 

 if(listItem.classList.contains('category')){  
  chosenCat.innerText = listItem.innerText
 }
 if(listItem.classList.contains('color')){
  let colorBall = listItem.querySelector('figure')
  let color = window.getComputedStyle(colorBall).backgroundColor
  
  chosenCol.innerText = listItem.innerText;
  chosenColBall.style.backgroundColor = color;
 }
}



// managing budget json data
  const getData = async () =>{
    const response = await fetch('../data.json')
    const data = await response.json() 
    const budgets = data.budgets 
    const transactions = data.transactions

    let parentEle = document.querySelector('#budgets_parent')
    let spendingSummary = document.querySelector('#spending_summary') 
    let totalSum = document.querySelector('#total_sum')
    let spentSum = document.querySelector('#spent_sum')


     budgets.forEach(object => {
      const {category, maximum, theme} = object

      let SUM = 0
      for(let i = 0; i < budgets.length; i++){
          SUM += budgets[i].maximum
      }

      totalSum.textContent = `of $${SUM} limit`

      
      let procent = Math.min((35 / maximum) * 100, 100);
      
// add budget boxes dynamically
      let summaryBox = `
      <div id="spending_summary" class="mt-6">

            <article class="flex flex-col w-[364px]">
            <div data-name="container" class="flex justify-between">
            <div class='flex'>
              <figure class="bg-[${theme}] w-1 h-[22px] mr-3 rounded-md"></figure>
              <h4 class="text-[#696868]">${category}</h4>
            </div>
              <div class='flex'>
              <p class="mr-2 text-sm font-bold">$15.00</p>
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

    

// open and close small menu
    const threeDots = document.querySelectorAll('[data-name="three_dots"]')

    threeDots.forEach((button) =>{
    button.addEventListener('click', (e) =>{
      e.stopPropagation();
      const editOrDelete = button.querySelector('[data-name="edit_delete"]')
      const isAlreadyOpen = editOrDelete && !editOrDelete.classList.contains('hidden')

      document.querySelectorAll('[data-name="edit_delete"]').forEach((menu) =>{
        menu.classList.add('hidden')
      })

      if (editOrDelete && !isAlreadyOpen) {
        editOrDelete.classList.remove('hidden');
      }
      })
    })

    document.addEventListener('click', (e) =>{
      document.querySelectorAll('[data-name="edit_delete"]').forEach((menu =>{
        if (!menu.contains(e.target) || e.target === threeDots){
          menu.classList.add('hidden');
        }
      }))
     
    })

// add last spendings
     let oneSpending = document.querySelectorAll('[data-name="parent_spendings"]')
     oneSpending.forEach(parent => {
                  for(let i = 0; i < 3; i++){
                parent.innerHTML += lastSpending
     }
     })

// see all - redirect to transactions page
     const seeAllBtns = document.querySelectorAll('[data-name="see_all"]')
     
     seeAllBtns.forEach(button =>{
      button.addEventListener('click', () =>{
        window.location.href ="transactions.html"
      })
     })
  
  }

  getData()