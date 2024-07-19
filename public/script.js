let expenses = [];
let total = 0;
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const date = document.getElementById("date");
const submit = document.getElementById("submit");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmount = document.getElementById("total-amount");

submit.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (amount.value === "" || date.value === "") {
        alert("Fill the required fields");
        return;
    }
    if (Number(amount.value) <= 0) {
        alert("Amount must be greater than 0");
        return;
    }

    const newExpense = {
        category: category.value,
        amount: Number(amount.value),
        description: description.value,
        date: date.value
    };

    expenses.push(newExpense);

    if (newExpense.category === "Expense") {
        total -= newExpense.amount;
    }
    if (newExpense.category === "Income") {
        total += newExpense.amount;
    }
    totalAmount.textContent = total;

    const tr = document.createElement("tr");
    const tdCategory = document.createElement("td");
    const tdAmount = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdDate = document.createElement("td");
    const tdDelete = document.createElement("button");

    tdCategory.textContent = newExpense.category;
    tdAmount.textContent = newExpense.amount;
    tdDescription.textContent = newExpense.description;
    tdDate.textContent = newExpense.date;
    tdDelete.textContent = "Delete";
    tdDelete.classList.add("delete");

    tdDelete.addEventListener("click", (e) => {
        const index = expenses.indexOf(newExpense);
        if (index > -1) {
            expenses.splice(index, 1);
        }
        if (newExpense.category === "Expense") {
            total += newExpense.amount;
        }
        if (newExpense.category === "Income") {
            total -= newExpense.amount;
        }
        totalAmount.textContent = total;
        expenseTableBody.removeChild(tr);
    });

    tr.appendChild(tdCategory);
    tr.appendChild(tdAmount);
    tr.appendChild(tdDescription);
    tr.appendChild(tdDate);
    tr.appendChild(tdDelete);
    expenseTableBody.appendChild(tr);

    // Clear input fields after submission
    category.value = "";
    amount.value = "";
    description.value = "";
    date.value = "";
});
