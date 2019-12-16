import { Eventing } from "./Eventing";
import { List } from "./List";

export interface ExpenseList {
  title?: string;
  value?: number;
  id?: number;
}

export class Expense {
  public totalExpense: number = 0;
  public events: Eventing = new Eventing();
  public list: List = new List();

  constructor() {
    this.bindChange();
  }

  //bind change
  private bindChange = (): void => {
    this.list.events.on("change", () => {
      this.updateTotalExpense();
    });
  };

  //updating total expense
  private updateTotalExpense = (): void => {
    let expense: number = 0;
    this.list.expenseList.forEach(item => {
      expense += item.value;
    });

    this.totalExpense = expense;
  };

  //add list item to expense list
}
