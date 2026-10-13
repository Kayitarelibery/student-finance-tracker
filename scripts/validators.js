const descriptionPattern = /^\S(?:.*\S)?$/;
const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
const duplicateWordPattern = /\b(\w+)\s+\1\b/i;

function validateDescription(description){
    return descriptionPattern.test(description);
}
function validateAmount(amount){
    return amountPattern.test(amount);
}
function validateDate(date){
    return datePattern.test(date);
}
function validateCategory(category){
    return categoryPattern.test(category);
}
function hasDuplicateWord(text){
    return duplicateWordPattern.test(text);
}
export{
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    hasDuplicateWord
};