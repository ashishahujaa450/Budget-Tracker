import { Expense } from "./Expense";
import { Eventing } from "./Eventing";

export interface BudgetProps {
  totalBudget?: number;
}

export class Budget {
  balance: number = 0;
  expense: Expense = new Expense();
  events: Eventing = new Eventing();

  constructor(public data: BudgetProps) {
    this.bindChange();
  }

  bindChange = (): void => {
    this.updateBalance();
  };

  //updating balance
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
