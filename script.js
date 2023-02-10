
const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balenceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

// let transactions = [
//     { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
//     { id: 2, name: 'Salario', amount: 3000 },
//     { id: 3, name: 'Torta de frango', amount: -10 },
//     { id: 4, name: 'Violão', amount: 150 },
//     { id: 5, name: 'Conta de Luz', amount: -150 },
//     { id: 6, name: 'Conta de Agua', amount: -90 },
//     { id: 7, name: 'Gas', amount: -90 },
//     { id: 8, name: 'Combustivel', amount: -150 }
// ]

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operador = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span>${operador} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button>
    `
    transactionUl.append(li)
}

const updateBalanceValues = () => {
    const transactionAmounts = transactions.map(transaction => transaction.amount)
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionAmounts
        .filter(item => item > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionAmounts
        .filter(item => item < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

    balenceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateId = () => Math.round(Math.random() * 1000)

const addToTransactionArra = (transactionName, transactionAmounts) => {
    transactions.push({
        id: generateId(),
        name: transactionName,
        amount: Number(transactionAmounts)
    })
}

const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
}
const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmounts = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmounts === ''

    if (isSomeInputEmpty) {
        alert('Por favor, preencha um nome ou valor')
        return
    }
    addToTransactionArra(transactionName, transactionAmounts)
    init()
    updateLocalStorage()
    cleanInputs()

}

form.addEventListener('submit', handleFormSubmit)
