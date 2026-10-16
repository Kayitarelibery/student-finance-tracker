const STORAGE_KEY = "studentFinanceTrackerTransactions";

export function saveTransactions(transactions){
    try{
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(transactions)
        );
        return true;
    }catch (error){
        console.error("Could not save transactions:", error);
        return false;
    }
}
export function loadTransactions(){
    try{
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData === null){
            return [];
        }
        const transactions = JSON.parse(savedData);
        if(!Array.isArray(transactions)){
            console.error("Saved transaction data is not ana array.");
            return [];
        }
        return transactions;
    }catch (error){
        console.error("Could not load transactions:", error);
        return [];
    }
}