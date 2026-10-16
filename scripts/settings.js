const currencySelect = document.getElementById("currency-select");
const currencyStatus = document.getElementById("currency-status");

const CURRENCY_KEY = "studentFinanceTrackerCurrency";
export function getCurrency(){
    return localStorage.getItem(CURRENCY_KEY) || "RWF";
}
function updateCurrencyStatus(){
    currencyStatus.textContent =  `Display currency set to ${getCurrency()}.`;
}
currencySelect.value = getCurrency();
currencySelect.addEventListener("change", () =>{
    localStorage.setItem(CURRENCY_KEY, currencySelect.value);
    updateCurrencyStatus();
    window.dispatchEvent(new CustomEvent("currencychange"));
});
updateCurrencyStatus();