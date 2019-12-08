import { Expense } from "./Expense";

export interface BudgetProps {
  totalBudget?: number;
}

export class Budget {
  balance: number = 0;
  expense: Expense = new Expense();

  constructor(public data: BudgetProps) {}

  //updating balancec
  updateBalance = (): void => {
    this.balance = this.data.totalBudget - this.expense.totalExpense;
  };

  //delegating methods to expense class
  get addListItem() {
    return this.expense.addListItem;
  }

  get removeListItem() {
    return this.expense.removeListItem;
  }

  get updateListItem() {
    return this.expense.updateListItem;
  }
}
