import { setTransactions, getTransactions } from "./records.js";

const exportButton = document.getElementById("export-data");
const importButton = document.getElementById("import-data");
const importFile = document.getElementById("import-file");
const backupStatus = document.getElementById("backup-status");
exportButton.addEventListener("click", () =>{
    const data = getTransactions();
    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student-finance-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    backupStatus.textContent = "Transactions exported successfully.";
});
importButton.addEventListener("click", async () =>{
    const file = importFile.files[0];
    if(!file){
        backupStatus.textContent = "Please select a JSON file first.";
        return;
    }
    try{
        const text = await file.text();
        const data = JSON.parse(text);
        if(!Array.isArray(data)){
            throw new Error("The file must contain an array of transaction.");
        }
        const valid = data.every(item =>
            item &&
            typeof item.id === "string" &&
            typeof item.description === "string" &&
            Number.isFinite(Number(item.amount)) &&
            Number(item.amount) > 0 &&
            typeof item.category === "string" &&
            typeof item.date === "string"
        );
        if(!valid){
            throw new Error("Some transactions have invalid or missing fields.");
        }
        setTransactions(data);
        backupStatus.textContent = `${data.length} transactions imported successfully.`;
    } catch (error){
        backupStatus.textContent = `Import failed: ${error.message}`;
    }
});