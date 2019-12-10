import { Expense } from "./Expense";

export interface BudgetProps {
  totalBudget?: number;
}

export class Budget<T extends BudgetProps> {
  public balance: number = 0;
  public expense: Expense = new Expense();

  constructor(public data: T) {
    this.bindChange();
  }

  private bindChange = (): void => {
    this.expense.events.on("change", () => {
      this.updateBalance();
    });
  };

  //updating balance
  private updateBalance = (): void => {
    this.balance = this.data.totalBudget - this.expense.totalExpense;
  };

  //delegating methods to expense class
  public get addListItem() {
    return this.expense.addListItem;
  }

  public get removeListItem() {
    return this.expense.removeListItem;
  }

  public get updateListItem() {
    return this.expense.updateListItem;
  }
}
