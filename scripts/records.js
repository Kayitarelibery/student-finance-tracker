const recordsBody = document.getElementById("records-body");
const searchInput = document.getElementById("search-input");
const searchError = document.getElementById("search-error");
const sortSelect = document.getElementById("sort-select");
const recordCount = document.getElementById("record-count");
let transactions = [];
let onEdit = () => {};
let onChange = () => {};

export function setTransactions(data){
    transactions = data;
    renderRecords();
}
export function setRecordCallbacks(callbacks){
    onEdit = callbacks.onEdit || (() => {});
    onChange = callbacks.onChange || (() => {});
}
function compileRegex(pattern){
    try{
        return pattern ? new RegExp(pattern, "gi") : null;
    }catch{
        return false;
    }
}
function appendHighlightedText(cell, text, regex){
    if(!regex){
        cell.textContent = text;
        return;
    }
    const matches = [...text.matchAll(new RegExp(regex.source, regex.flags))];
    if(matches.length === 0){
        cell.textContent = text;
        return;
    }
    let position = 0;
    matches.forEach(match =>{
        const index = match.index;
        cell.appendChild(
            document.createTextNode(text.slice(position, index))
        );
        const mark = document.createElement("mark");
        mark.textContent = match[0];
        cell.appendChild(mark);
        position = index + match[0].length;
    });
    cell.appendChild(document.createTextNode(text.slice(position)));
}
function renderRecords(){
    const regex = compileRegex(searchInput.value);
    if(regex === false){
        searchError.textContent = "Invalid regular expression. Check your pattern.";
        return;
    }
    searchError.textContent = "";
    recordsBody.replaceChildren();
    const filtered = transactions.filter(transaction =>{
      if (!regex) return true;
      const searchable = `${transaction.description} ${transaction.category}`;
      regex.lastIndex = 0;
      return regex.test(searchable);
    });
    
    filtered.sort((a,b) =>{
        switch(sortSelect.value){
            case "date-asc":
            return a.date.localeCompare(b.date);
            case "date-desc":
                return b.date.localeCompare(a.date);
            case "description-asc":
                return a.description.localeCompare(b.description);
            case "description-desc":
                return b.description.localeCompare(a.description);
            case "amount-asc":
                return a.amount - b.amount;
            case "amount-desc":
                return b.amount - a.amount;
            default:
                return 0;                   
        }
    });
    filtered.forEach(transaction =>{
        const row = document.createElement("tr");
        
        const descriptionCell = document.createElement("td");
        appendHighlightedText(descriptionCell, transaction.description, regex);
        row.appendChild(descriptionCell);

        const amountCell = document.createElement("td");
        amountCell.textContent = Number(transaction.amount).toFixed(2);
        row.appendChild(amountCell);

        const categoryCell = document.createElement("td");
        appendHighlightedText(categoryCell, transaction.category, regex);
        row.appendChild(categoryCell);
         
        const dateCell = document.createElement("td");
        dateCell.textContent = transaction.date;
        row.appendChild(dateCell);
         
        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent  = "Edit";
        editButton.addEventListener("click", () => onEdit(transaction));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", () =>{
            if (confirm(`Delete "${transaction.description}"?`)){
                transactions = transactions.filter(
                    item => item.id  !== transaction.id
                );
                renderRecords();
                onChange(transactions);
            }
        });
        actionsCell.append(editButton, deleteButton);
        row.appendChild(actionsCell);
        recordsBody.appendChild(row);
    });
    recordCount.textContent =  `${filtered.length} transaction(s) displayed.`;
}
searchInput.addEventListener("input", renderRecords);
sortSelect.addEventListener("change", renderRecords);
export {renderRecords};