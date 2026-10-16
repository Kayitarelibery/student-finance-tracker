const totalSpending = document.getElementById("total-spending");
const totalTransactions = document.getElementById("total-transactions");
const topCategory = document.getElementById("top-category");
const weeklySpending = document.getElementById("weekly-spending");
const categorySummary = document.getElementById("category-summary");

const spendingCapDisplay = document.getElementById("spending-cap");
const remainingBudgetDisplay = document.getElementById("remaining-budget");
const capStatus = document.getElementById("cap-status");

const spendingCapInput = document.getElementById("spending-cap-input");
const saveCapButton = document.getElementById("save-spending-cap");
const settingsStatus = document.getElementById("settings-status");

let spendingCap = Number(
    localStorage.getItem("studentFinanceTrackerSpendingCap")
);
if(!Number.isFinite(spendingCap) || spendingCap <= 0){
    spendingCap = null;
}
let currentTransactions = [];
function formatMoney(amount){
    const currency = localStorage.getItem("studentFinanceTrackerCurrency") || "RWF";
    return new Intl.NumberFormat("en",{
        style: "currency",
        currency
    }).format(Number(amount));
}
export function updateDashboard(transactions){
    currentTransactions = transactions;
    const total = transactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );
    totalSpending.textContent = formatMoney(total);
    totalTransactions.textContent = transactions.length;
    const categoryTotals = {};
    transactions.forEach(transaction =>{
        const category = transaction.category;
        categoryTotals[category]=(categoryTotals[category] || 0) + Number(transaction.amount);
    });
    const categories = Object.entries(categoryTotals);
    if(categories.length === 0){
        topCategory.textContent = "None yet";
        categorySummary.replaceChildren();

        const item = document.createElement("li");
        item.textContent = "No spending recorded yet.";
        categorySummary.appendChild(item);
    }else{
        categories.sort((a,b) => b[1] - a[1]);
        topCategory.textContent = categories[0][0];
        categorySummary.replaceChildren();
        categories.forEach(([category, amount])=>{
            const item = document.createElement("li");
            item.textContent = `${category}: ${formatMoney(amount)}`;
            categorySummary.appendChild(item);
        });
    }
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const weeklyTotal = transactions.filter(transaction =>{
        const date = new Date(
         `${transaction.date}T00:00:00`
        );
        return date >= sevenDaysAgo && date <= today;
    })
    .reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );
    weeklySpending.textContent = formatMoney(weeklyTotal);
    updateSpendingCap(total);
}
function updateSpendingCap(total){
    if (spendingCap === null){
        spendingCapDisplay.textContent = "Not set";
        remainingBudgetDisplay.textContent = "Not set";
        capStatus.textContent = "Set a spending cap in Settings.";
        return;
    }
    const remaining = spendingCap - total;

    spendingCapDisplay.textContent = formatMoney(spendingCap);
    remainingBudgetDisplay.textContent = formatMoney(remaining);
    if(remaining < 0){
        capStatus.textContent = `You have exceeded your cap by ${formatMoney(Math.abs(remaining))}.`;   
    } else if (remaining === 0){
        capStatus.textContent = "You have reached your spending cap.";
    }else {
        capStatus.textContent = `${formatMoney(remaining)} remaining in your spending cap.`;
    }
}
saveCapButton.addEventListener("click", () =>{
    const value = spendingCapInput.value.trim();
    const cap = Number(value);
    if (value === "" || !Number.isFinite(cap) || cap <= 0){
        settingsStatus.textContent = "Enter a spending cap greater than zero.";
        spendingCapInput.focus();
        return;
    }
    spendingCap = cap;
    localStorage.setItem(
        "studentFinanceTrackerSpendingCap",
        String(spendingCap)
    );
    settingsStatus.textContent = "Spending cap set successfully.";
    const total = currentTransactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );
    updateSpendingCap(total);
});