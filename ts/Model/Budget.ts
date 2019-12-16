import { Expense } from "./Expense";
import { Income } from "./Income";

export interface BudgetProps {
  totalBudget?: number;
}

export class Budget {
  public balance: number = 0;
  public expense: Expense = new Expense();
  public income: Income = new Income();

  constructor(public data: BudgetProps) {
    this.bindChange();
  }

  private bindChange = (): void => {
    this.on("change", () => {
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

  public get on() {
    return this.expense.events.on;
  }

  public get trigger() {
    return this.expense.events.trigger;
  }
}
