const currentBalanceEl = document.getElementById('current-balance');
const incomeAmountEl = document.getElementById('income-amount');
const expenseAmountEl = document.getElementById('expense-amount');
 
const totalSavedPotsEl = document.getElementById('total-saved-pots');
const potsGridEl = document.getElementById('pots-grid'); 

const budgetProgressBarEl = document.getElementById('budget-progress-bar'); 
const budgetCurrentAmountEl = document.getElementById('budget-current-amount'); 
const budgetLimitAmountEl = document.getElementById('budget-limit-amount'); 
const budgetCategoriesGridEl = document.getElementById('budget-categories-grid'); 

const transactionsListEl = document.getElementById('transactions-list');

const paidBillsAmountEl = document.getElementById('paid-bills-amount');
const totalUpcomingBillsAmountEl = document.getElementById('total-upcoming-bills-amount');
const dueSoonBillsAmountEl = document.getElementById('due-soon-bills-amount');

const sidebarEl = document.querySelector('aside');
const mainContentEl = document.querySelector('main');
const minimizeMenuBtn = document.getElementById('minimize-menu-btn');

const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');


function formatCurrency(val) {
    return `$${(parseFloat(val) || 0).toFixed(2)}`;
}


function formatDate(dateString) {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return 'Invalid Date';
    
 
    const optionsMonthYear = { month: 'short', year: 'numeric' };
    const optionsDayMonthYear = { day: 'numeric', month: 'short', year: 'numeric' };

    
    return dateObj.toLocaleDateString('en-US', optionsDayMonthYear);
}


let appData = JSON.parse(localStorage.getItem('financeAppData')) || {
    currentBalance: 4836.00,
    income: 3814.25,
    expenses: 1700.50,

    pots: [
        { name: 'Savings', amount: 159, color: '#277C78' }, 
        { name: 'Gift', amount: 40, color: '#82C9D7' },
        { name: 'Concert Ticket', amount: 110, color: '#626070' },
        { name: 'New Laptop', amount: 10, color: '#F2CDAC' },
    ],

    budgets: {
        limit: 975.00,
        currentSpent: 338.00,
        categories: [
            { name: 'Entertainment', amount: 50.00, color: '#626070' }, 
            { name: 'Bills', amount: 750.00, color: '#82C9D7' },
            { name: 'Dining Out', amount: 75.00, color: '#F2CDAC' },
            { name: 'Personal Care', amount: 100.00, color: '#277C78' },
        ]
    },

    transactions: [
        { id: 1, name: 'Emma Richardson', amount: 75.50, type: 'income', date: '2024-08-20', icon: 'profile-emma.jpg' }, 
        { id: 2, name: 'Savory Bites Bistro', amount: 55.50, type: 'expense', date: '2024-08-19', icon: 'bread-icon.svg', iconBg: '#F8F4F0' }, 
        { id: 3, name: 'Daniel Carter', amount: 42.30, type: 'expense', date: '2024-08-18', icon: 'profile-daniel.jpg' }, 
        { id: 4, name: 'Sun Park', amount: 120.00, type: 'income', date: '2024-08-17', icon: 'profile-sun.jpg' }, 
        { id: 5, name: 'Urban Service Hub', amount: 65.00, type: 'expense', date: '2024-08-17', icon: 'building-icon.svg', iconBg: '#F2CDAC' }, 
    ],

    recurringBills: {
        paid: 190.00,
        totalUpcoming: 194.98,
        dueSoon: 59.98
    },

    isSidebarMinimized: false
};


function saveAppData() {
    localStorage.setItem('financeAppData', JSON.stringify(appData));
}


function updateUI() {
   
    currentBalanceEl.textContent = formatCurrency(appData.currentBalance);
    incomeAmountEl.textContent = formatCurrency(appData.income);
    expenseAmountEl.textContent = formatCurrency(appData.expenses);

    appData.totalSaved = appData.pots.reduce((sum, pot) => sum + pot.amount, 0);
    totalSavedPotsEl.textContent = formatCurrency(appData.totalSaved);
    renderPots(); 


    const budgetPercentage = (appData.budgets.currentSpent / appData.budgets.limit) * 100;
   
    budgetCurrentAmountEl.textContent = formatCurrency(appData.budgets.currentSpent);
    budgetLimitAmountEl.textContent = `of ${formatCurrency(appData.budgets.limit)} limit`;
    renderBudgetCategories(); 
    updateBudgetDoughnutChart(); 
    renderTransactions();

    
    paidBillsAmountEl.textContent = formatCurrency(appData.recurringBills.paid);
    totalUpcomingBillsAmountEl.textContent = formatCurrency(appData.recurringBills.totalUpcoming);
    dueSoonBillsAmountEl.textContent = formatCurrency(appData.recurringBills.dueSoon);


    updateSidebarState(); 

    saveAppData();
}


function renderPots() {
    potsGridEl.innerHTML = '';
  
    appData.pots.forEach(pot => {
        const potDiv = document.createElement('div');
        potDiv.className = 'flex items-center gap-[12px]'; 
        potDiv.innerHTML = `
            <span class="w-[4px] h-[36px] rounded-[2px]" style="background-color: ${pot.color};"></span>
            <div class="flex flex-col">
                <p class="text-[#696868] text-[14px] leading-[150%]">${pot.name}</p>
                <p class="text-[#201F24] text-[18px] font-[700] leading-[120%]">${formatCurrency(pot.amount)}</p>
            </div>
        `;
        potsGridEl.appendChild(potDiv);
    });

   
}

function renderBudgetCategories() {
    budgetCategoriesGridEl.innerHTML = '';
    
    appData.budgets.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'flex flex-col items-center justify-center bg-[#FDF0E1] rounded-[10px] p-3 text-center h-[120px]';
        categoryDiv.innerHTML = `
            <p class="text-[14px] text-[#696868] leading-[150%]">${category.name}</p>
            <p class="font-[700] text-[#201F24] text-[20px] leading-[120%]">${formatCurrency(category.amount)}</p>
        `;
        budgetCategoriesGridEl.appendChild(categoryDiv);
    });
}


let budgetDoughnutChart; 

function updateBudgetDoughnutChart() {
    const ctx = document.getElementById('doughnut'); 
    const data = appData.budgets.categories.map(cat => cat.amount);
    const colors = appData.budgets.categories.map(cat => cat.color); 

    if (budgetDoughnutChart) {

        budgetDoughnutChart.data.datasets[0].data = data;
        budgetDoughnutChart.data.datasets[0].backgroundColor = colors;
        budgetDoughnutChart.update();
    } else {

        budgetDoughnutChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        label: "Budget Spend",
                        data: data,
                        borderWidth: 0,
                        backgroundColor: colors,
                    },
                ],
            },
            options: {
                cutout: "68%", 
                responsive: true,
                maintainAspectRatio: false, 
                plugins: {
                    legend: {
                        display: false 
                    },
                    tooltip: {
                        enabled: true 
                    }
                }
            },
        });
    }

  
    const budgetLegendEl = document.getElementById('budget-legend'); 
    if (budgetLegendEl) {
        budgetLegendEl.innerHTML = '';
        appData.budgets.categories.forEach(category => {
            const legendItem = document.createElement('div');
            legendItem.className = 'flex items-center gap-[12px]';
            legendItem.innerHTML = `
                <span class="w-[4px] h-[36px] rounded-[2px]" style="background-color: ${category.color};"></span>
                <div class="flex flex-col">
                    <p class="text-[#696868] text-[14px] leading-[150%]">${category.name}</p>
                    <p class="text-[#201F24] text-[18px] font-[700] leading-[120%]">${formatCurrency(category.amount)}</p>
                </div>
            `;
            budgetLegendEl.appendChild(legendItem);
        });
    }
}


function renderTransactions() {
    transactionsListEl.innerHTML = '';
   
    const sortedTransactions = [...appData.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); 

    sortedTransactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'flex items-center justify-between py-[12px] border-b border-gray-200 last:border-b-0';

        const amountClass = transaction.type === 'income' ? 'text-[#277C78]' : 'text-[#D32F2F]';
        const amountSign = transaction.type === 'income' ? '+' : '-';
        const formattedDate = formatDate(transaction.date); 

        let iconContent;
        if (transaction.icon.endsWith('.jpg') || transaction.icon.endsWith('.png')) {
            
            iconContent = `<div class="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
                                <img src="/assets/images/${transaction.icon}" alt="${transaction.name}" class="w-full h-full object-cover">
                            </div>`;
        } else if (transaction.icon.endsWith('.svg')) {
            
            let svgPath = '';
            let bgColor = transaction.iconBg || '#E0E0E0'; 
            let svgColor = '#696868'; 
            if (transaction.name === 'Savory Bites Bistro') {
                svgPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3v2a3 3 0 01-3 3c-1.657 0-3-1.343-3-3V11a3 3 0 013-3z"/>
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8V4c0-1.105-.895-2-2-2S8 2.895 8 4v4m4 0a3 3 0 013 3v2c0 1.657-1.343 3-3 3s-3-1.343-3-3V11c0-1.657 1.343-3 3-3z"/>`;
                svgColor = '#8C7B70';
            } else if (transaction.name === 'Urban Service Hub') {
                svgPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 10h.01M15 10h.01M9 14h.01M15 14h.01M12 14h.01M12 18h.01"/>`;
                svgColor = '#A0522D';
            }
            

            iconContent = `<div class="w-[40px] h-[40px] rounded-full flex items-center justify-center flex-shrink-0" style="background-color: ${bgColor};">
                                <svg class="w-[20px] h-[20px]" fill="none" stroke="${svgColor}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    ${svgPath}
                                </svg>
                            </div>`;
        } else {
            
            iconContent = `<div class="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">?</div>`;
        }


        transactionDiv.innerHTML = `
            <div class="flex items-center gap-[12px]">
                ${iconContent}
                <div class="flex flex-col">
                    <div class="text-[#201F24] text-[16px] font-medium leading-[150%]">${transaction.name}</div>
                    <div class="text-[14px] text-[#696868] leading-[150%]">${formattedDate}</div>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <div class="${amountClass} text-[16px] font-semibold leading-[150%]">${amountSign} ${formatCurrency(transaction.amount)}</div>
                <div class="text-[14px] text-[#696868] leading-[150%]">${formattedDate}</div> </div>
        `;
        transactionsListEl.appendChild(transactionDiv);
    });
}

function updateSidebarState() {
    if (appData.isSidebarMinimized) {
        sidebarEl.classList.add('minimized');
        mainContentEl.classList.add('shifted');
    } else {
        sidebarEl.classList.remove('minimized');
        mainContentEl.classList.remove('shifted');
    }
}

minimizeMenuBtn.addEventListener('click', () => {
    appData.isSidebarMinimized = !appData.isSidebarMinimized;
    updateUI();
});


function setActiveLinkAndSection(targetId) {
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref.includes('#')) {
            const sectionId = linkHref.split('#')[1];
            if (sectionId === targetId) {
                link.classList.add('bg-[#EAEAEA]', 'text-[#201F24]', 'font-semibold'); 
            } else {
                link.classList.remove('bg-[#EAEAEA]', 'text-[#201F24]', 'font-semibold');
            }
        }
    });

    sections.forEach(section => {
        if (section.id === targetId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        const targetId = e.currentTarget.getAttribute('href').split('#')[1]; 
        setActiveLinkAndSection(targetId);
        saveAppData(); 
    });
});


document.addEventListener('DOMContentLoaded', () => {
  
    setActiveLinkAndSection('overview-section'); 
    updateUI();
});

