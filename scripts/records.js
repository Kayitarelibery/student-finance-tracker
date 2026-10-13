const recordsBody = document.getElementById("records-body");
const searchInput = document.getElementById("search-input");
const searchError = document.getElementById("search-error");
const sortSelect = document.getElementById("sort-select");
const recordCount = document.getElementById("record-count");
let transactions = [];
function setTransactions(data){
    transactions = data;
    renderRecords();
}
function renderRecords(){
    const regex = compileRegex(searchInput.value);
    if(regex === false){
        searchError.textContent = "Invalid regular expression. Check your pattern.";
        return;
    }
    searchError.textContent = "";
    recordsBody.replaceChildren();
    let filtered = transactions.filter(transaction =>{
        const searchable = `${transaction.description} ${transaction.category}`;
        return !regex || regex.test(searchable);
    });
    const sortBy = sortSelect.value;
    filtered.sort((a,b) =>{
        if (sortBy.startWith("date")){
            return sortBy === "date-asc"
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        }
        if (sortBy.startWith("description")){
            const result = a.description.localeCompare(b.description);
            return sortBy === "description-asc" ? result : -result;
        }
        return sortBy === "amount-asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    });
    filtered.forEach(transaction =>{
        const row = document.createElement("tr");
        [
            transaction.description,
            Number(transaction.amount).toFixed(2),
            transaction.category,
            transaction.date
        ].forEach(value =>{
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        const actions = document.createElement("td");
        actions.textContent = "Edit and Delete coming next";
        row.appendChild(actions);
        recordsBody.appendChild(row);
    });
    recordCount.textContent =  `${filtered.length} transaction(s) displayed.`;
}
searchInput.addEventListener('input, renderRecords');
sortSelect.addEventListener("change", renderRecords);
export { setTransactions, renderRecords};