import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    hasDuplicateWord
} from "./validators.js";
import { 
    setTransactions,
    setRecordCallbacks 
} from "./records.js";
const form = document.getElementById("transaction-form");
const fields = {
    description: document.getElementById("description"),
    amount: document.getElementById("amount"),
    category: document.getElementById("category"),
    date: document.getElementById("date")
};
const status = document.getElementById("form-status");
const validators = {
    description: validateDescription,
    amount: validateAmount,
    category: validateCategory,
    date: validateDate
};
const messages ={
    description: "Enter a description without leading or trailing spaces",
    amount: "Enter a valid amount with up to two decimal places.",
    category: "Choose a valid category.",
    date: "Enter a date in YYYY-MM-DD format."
};
let transactions = [];
let editingId = null;
setRecordCallbacks({
    onEdit: (transaction) =>{
        editingId = transaction.id;

        fields.description.value = transaction.description;
        fields.amount.value = transaction.amount;
        fields.category.value = transaction.category;
        fields.date.value = transaction.date;

        status.textContent = "you are editing a transaction.";
        
        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        fields.description.focus();
    },
    onChange: (updatedTransactions) => {
        transactions = updatedTransactions;
        setTransactions(transactions);
    }
});
function validateField(name){
    const field = fields[name];
    const error = document.getElementById(`${name}-error`);
    const valid = validators[name](field.value);
    error.textContent = valid ? "" : messages[name];
    field.setAttribute("aria-invalid", String(!valid));
    return valid;
}
Object.keys(fields).forEach(name =>{
    fields[name].addEventListener("blur", () => validateField(name));
    fields[name].addEventListener("input", () => validateField(name));
    fields[name].addEventListener("change", () => validateField(name));
});
form.addEventListener("submit", event =>{
    event.preventDefault();
    const results = Object.keys(fields).map(validateField);
    const description = fields.description.value;
    if(hasDuplicateWord(description)){
        document.getElementById("description-error").textContent = "Avoid repeating the same word twice.";
        fields.description.setAttribute("aria-invalid", "true");
        results[0] = false;
    }
    if(!results.every(Boolean)){
        status.textContent = "Please correct the errors before saving";
        return;
    }
    const now = new Date().toISOString();
    if (editingId !== null){
        transactions = transactions.map(transaction =>{
            if (transaction.id === editingId){
                return {
                    ...transaction,
                    description: fields.description.value,
                    amount: Number(fields.amount.value),
                    category: fields.category.value,
                    date: fields.date.value,
                    updatedAt: now
                };
            }
            return transaction;
        });
        status.textContent = "Transaction updated successfully.";
    }else{
        const transaction ={
            id: `rec_${Date.now()}`,
            description: fields.description.value,
            amount: Number(fields.amount.value),
            category: fields.category.value,
            date: fields.date.value,
            createdAt: now,
            updatedAt: now
        };
        transactions.push(transaction);
    }
    setTransactions(transactions);
    const wasEditing = editingId !== null;
    form.reset();
    editingId = null;
    status.textContent = wasEditing
    ? "Transaction updated successfully."
    : "Transaction added successfully.";
});