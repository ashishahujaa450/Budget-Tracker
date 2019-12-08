import { Budget } from "./Model/Budget";

const item = new Budget({
  totalBudget: 5000,
  expenseList: [
    {
      expenseTitle: "value one",
      expenseValue: 1000
    },
    {
      expenseTitle: "another one",
      expenseValue: 1500
    },
    {
      expenseTitle: "new title",
      expenseValue: 500
    }
  ]
});

item.updateTotalExpense();
item.updateBalance();

console.log(item);
