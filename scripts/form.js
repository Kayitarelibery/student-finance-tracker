import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    hasDuplicateWord
} from "./validators.js";
const form = document.getElementById("transaction-form");
const fields={
   description: document.getElementById("description"),
   amount: document.getElementById("amount"),
   category: document.getElementById("category"),
   date: document.getElementById("date")
};
const validators = {
    description: validateDescription,
    amount: validateAmount,
    category: validateCategory,
    date: validateDate
};
const messages = {
    description: "Enter a description without leading or trailing spaces.",
    amount: "Enter a non-negative amount with up to two decimal places.",
    category: "Choose a valid category",
    date: "Enter a date in YYYY-MM-DD format."
};
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
fields[name].addEventListener("input", ()=> validateField(name));
fields[name].addEventListener("change", () => validateField(name));
});
form.addEventListener("submit", event =>{
  event.preventDefault();
  const results = Object.keys(fields).map(validateField);
  const description = fields.description.value;
  if(hasDuplicateWord(description)){
    document.getElementById("description-error").textcontent = "Avoid repeating the same word twice.";
    fields.description.setAttribute("aria-invalid", "true");
    results[0] = false;
  }
  if (results.every(Boolean)){
    status.textContent = "Validation successful! The form is ready for transaction-saving logic.";
  }else{
        status.textContent = "Please correct the highlighted fields before continuing."
  }
});
form.addEventListener("reset", () => {
    Object.keys(fields).forEach(name =>{
        document.getElementById(`${name}-error`).textContent = "";
        fields[name].removeAttribute("aria-invalid");
    });
    status.textContent = "";
});