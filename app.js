//console.log("firstapp");

//DOM
//getelementbyid from html
  //key:value
        // {id:4,type: "expense", amount: 1000,  detail: "rent"},




//innerHTML - inside my HTML
// income.innerHTML = 200
// arrow function
// const calculate = () =>{
// }

//function -bunch of instruction and you put it in a box
    //Loop- doing the same thing over and over
    //while - you clean  a board till its clean.. you dont know exactly where it will stop but eventually it will stop
    //for - you already know when to get your salary you need to keep coming like 1 to 25

  
  
    // document.getElementById('income').innerHTML = 'R' +incomeTransaction
   

    // init values
    let incomeTransaction = 0;
    let expenseTransaction = 0;
    let balanceTransaction = 0;
    let globalID = 0;
    
    // global state variable
    let state = {
        income: 0,
        expense: 0,
        balance: 0,
        transactions: [
        ]
    }
    // add transaction
    function addTransaction() {
    
        globalID = globalID + 1
    
        const transactionType = document.getElementById('transactionType').value
        const transactionDetail = document.getElementById('transactionDetail').value
        const transactionAmount = parseInt(document.getElementById('transactionAmount').value)
    
        if (transactionDetail.length < 3) {
            alert("Detail cannot be lesser than 3 letter")
    
            return;
        }
    
        if (isNaN(transactionAmount) || transactionAmount < 1) {
            alert("Provide the correct amount")
            return;
        }
    
        state.transactions.push({ id: globalID, type: transactionType, amount: transactionAmount, detail: transactionDetail })
    
        saveToStorage()
    
        render()
    
        // reset input
        document.getElementById('transactionDetail').value = ""
        document.getElementById('transactionAmount').value = ""
    
    }
    // calculate values
    function calculate() {
    
        incomeTransaction = 0;
        expenseTransaction = 0;
        balanceTransaction = 0;
    
        for (let i = 0; i < state.transactions.length; i++) {
    
            if (state.transactions[i].type == 'income') {
                incomeTransaction += parseInt(state.transactions[i].amount)
            }
    
            if (state.transactions[i].type == 'expense') {
                expenseTransaction += parseInt(state.transactions[i].amount)
            }
        }
        balanceTransaction = incomeTransaction - expenseTransaction
    }
    // display values to the ui
    function display() {
        document.getElementById('income').innerHTML = 'R' + incomeTransaction
        document.getElementById('expense').innerHTML = 'R' + expenseTransaction
        document.getElementById('balance').innerHTML = 'R' + balanceTransaction
    
        const transactionsID = document.getElementById('transactions')
    
    
        transactionsID.innerHTML = ''
    
        for (let i = 0; i < state.transactions.length; i++) {
    
            let myClass = ""
    
            if (state.transactions[i].type == 'expense') {
                myClass = 'expense-t'
            } else {
                myClass = 'income-t'
            }
    
            transactionsID.innerHTML += `
        
        <div class="transaction ${myClass}">
                <div class="detail">${state.transactions[i].detail}</div>
                <div class="amount">R${state.transactions[i].amount}</div>
                <div class="delete">
                   <button onclick="removeTransaction(${state.transactions[i].id})"> X </button>
                </div>
            </div>
        
        `
        }
    
    }
    // rendering the application
    function render() {
        readFromStorage()
        calculate()
        display()
    }
    function removeTransaction(id) {
        state.transactions = state.transactions.filter(stuff => stuff.id !== id)
    
        // /*
        // let w = []
    
        // for (let i = 0; i < state.transactions.length; i++) {
        //     if (state.transactions[i].id !== id) {
        //         w.push(state.transactions[i])
        //     }   
        // }
        // state.transactions = w
        // */
    
        saveToStorage()
        render()
    }
    function saveToStorage() {
        localStorage.setItem('transactions', JSON.stringify(state.transactions))
    }
    function readFromStorage() {
        if (localStorage.getItem('transactions')) {
            state.transactions = JSON.parse(localStorage.getItem('transactions'))
        }
    
    }
    // call the render
    render()