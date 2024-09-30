// Get DOM elements
const incomeDateInput = document.getElementById('income-date');
const incomeDescriptionInput = document.getElementById('income-description');
const incomeAmountInput = document.getElementById('income-amount');   

const addIncomeBtn = document.getElementById('add-income-btn');
const deleteIncomeBtn = document.getElementById('delete-income-btn');
const incomeList = document.getElementById('income-list');
const expenseDateInput = document.getElementById('expense-date');
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseAmountInput = document.getElementById('expense-amount');   

const addExpenseBtn = document.getElementById('add-expense-btn');
const deleteExpenseBtn = document.getElementById('delete-expense-btn');
const expenseList = document.getElementById('expense-list');
const totalIncomeSpan = document.getElementById('total-income');
const totalExpensesSpan = document.getElementById('total-expenses');
const netIncomeSpan = document.getElementById('net-income');

let incomeTransactions = [];
let expenseTransactions = [];
let foodExpenses = [];
let transportExpenses = [];
let entertainmentExpenses = [];

function addTransaction(type, date, description, category, amount) {
    const transaction = {
        type,
        date,
        description,
        category,
        amount
    };
    if (type === 'income') {
        incomeTransactions.push(transaction);
        updateIncomeList();
        incomeDateInput.value = '';
        incomeDescriptionInput.value = '';
        incomeAmountInput.value = '';
    } else {
        expenseTransactions.push(transaction);
        switch (category) {
            case "Food":
                foodExpenses.push(transaction);
                break;
            case "Transportation":
                transportExpenses.push(transaction);
                break;
            case "Entertainment":
                entertainmentExpenses.push(transaction);
                break;
            default:
                break;
        }
        updateExpenseList();
        expenseDateInput.value = '';
        expenseDescriptionInput.value = '';
        expenseCategorySelect.value = '';
        expenseAmountInput.value = '';
    }
    updateSummary();
}

function searchIndex(type, date, description, category, amount){
    let i=-1
    if(type==='income'){
        incomeTransactions.forEach((transaction,index) => {
            if(transaction.date===date && transaction.description.toLowerCase()===description.toLowerCase() && transaction.amount === amount){
                i=index;
            }
        });
    }else{
        expenseTransactions.forEach((transaction,index)=> {
            if(transaction.date===date && transaction.description.toLowerCase()===description.toLowerCase() && transaction.category===category && transaction.amount === amount){
                i=index;
            }
        });
    }
    return i;
}

function deleteTransaction(type, index) {
    console.log(index);
    if (type === 'income') {
      incomeTransactions.splice(index, 1);
      updateIncomeList();
      incomeDateInput.value = '';
      incomeDescriptionInput.value = '';
      incomeAmountInput.value = '';
    } else {
      expenseTransactions.splice(index, 1);
      updateExpenseList();
      expenseDateInput.value = '';
      expenseDescriptionInput.value = '';
      expenseCategorySelect.value = '';
      expenseAmountInput.value = '';
    }
    updateSummary();
}

function updateIncomeList() {
    incomeList.innerHTML = '';
    incomeTransactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.date} - ${transaction.description} - ${transaction.amount}/-`;
        incomeList.appendChild(listItem);
    });
}

function updateExpenseList() {
    expenseList.innerHTML = '';
    foodExpenses.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.category} : ${transaction.date} - ${transaction.description} - ${transaction.amount}/-`;
        expenseList.appendChild(listItem);
    });
    transportExpenses.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.category} : ${transaction.date} - ${transaction.description} - ${transaction.amount}/-`;
        expenseList.appendChild(listItem);
    });
    entertainmentExpenses.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.category} : ${transaction.date} - ${transaction.description} - ${transaction.amount}/-`;
        expenseList.appendChild(listItem);
    });
}

function updateSummary() {
    const totalIncome = incomeTransactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0);
    const totalExpenses = expenseTransactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0);
    const netIncome = totalIncome - totalExpenses;

    totalIncomeSpan.textContent= totalIncome;
    totalExpensesSpan.textContent = totalExpenses;
    netIncomeSpan.textContent = netIncome;
}

addIncomeBtn.addEventListener('click', () => {
    addTransaction('income', incomeDateInput.value, incomeDescriptionInput.value, '', incomeAmountInput.value);
});

addExpenseBtn.addEventListener('click', () => {
    addTransaction('expense', expenseDateInput.value, expenseDescriptionInput.value, expenseCategorySelect.value, expenseAmountInput.value);
});
  
deleteIncomeBtn.addEventListener('click', () => {
    let selectedIndex = searchIndex('income', incomeDateInput.value, incomeDescriptionInput.value, '', incomeAmountInput.value);
    if (selectedIndex !== -1) {
      deleteTransaction('income', selectedIndex);
    }
  });
  
deleteExpenseBtn.addEventListener('click', () => {
    switch (expenseCategorySelect.value) {
        case "Food":
            let foodIndex = searchItems('food', expenseDateInput.value, expenseDescriptionInput.value, expenseAmountInput.value);
            if (foodIndex !== -1) {
                deleteItems('Food', foodIndex);
            }
            break;
        case "Transportation":
            let transIndex = searchItems('trans', expenseDateInput.value, expenseDescriptionInput.value, expenseAmountInput.value);
            if (transIndex !== -1) {
                deleteItems('Transportation', transIndex);
            } 
            break;
        case "Entertainment":
            let enterIndex = searchItems('enter', expenseDateInput.value, expenseDescriptionInput.value, expenseAmountInput.value);
            if (enterIndex !== -1) {
                deleteItems('Entertainment', enterIndex);
            }    
            break;
        default:
            break;
    }
    let selectedIndex = searchIndex('expense', expenseDateInput.value, expenseDescriptionInput.value, expenseCategorySelect.value, expenseAmountInput.value);
    if (selectedIndex !== -1) {
      deleteTransaction('expense', selectedIndex);
    }
});

function deleteItems(cat,index){
    switch (cat) {
        case "Food":
            foodExpenses.splice(index,1);
            break;
        case "Transportation":
            transportExpenses.splice(index,1);
            break;
        case "Entertainment":
            entertainmentExpenses.splice(index,1);
            break;
        default:
            break;
    }
}

function searchItems(cat,date,desc,amount){
    let i=-1;
    switch (cat) {
        case "food":
            foodExpenses.forEach((item,index) => {
                    if(item.date===date && item.description.toLowerCase()===desc.toLowerCase() && item.amount === amount){
                        i=index;
                    }
                });
            break;
        case "trans":
            transportExpenses.forEach((item,index) => {
                if(item.date===date && item.description.toLowerCase()===desc.toLowerCase() && item.amount === amount){
                    i=index;
                }
            });
            break;
        case "enter":
            entertainmentExpenses.forEach((item,index) => {
                if(item.date===date && item.description.toLowerCase()===desc.toLowerCase() && item.amount === amount){
                    i=index;
                }
            });
            break;
        default:
            i=-1;
            break;
    }
    return i;
}
