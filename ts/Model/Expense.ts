import { Eventing } from "./Eventing";

export interface ExpenseList {
  title?: string;
  value?: number;
  id?: number;
}

export class Expense {
  public totalExpense: number = 0;
  public expenseList: ExpenseList[] = [];
  public events: Eventing = new Eventing();

  constructor() {
    this.bindChange();
  }

  //bind change
  private bindChange = (): void => {
    this.events.on("change", () => {
      this.updateTotalExpense();
    });
  };

  //updating total expense
  private updateTotalExpense = (): void => {
    let expense: number = 0;
    this.expenseList.forEach(item => {
      expense += item.value;
    });

    this.totalExpense = expense;
  };

  //add list item to expense list
  public addListItem = (item: ExpenseList): void => {
    //checking if already have id than just update the existed item
    if (item.id >= 0) {
      const currentItem = this.expenseList.find(elm => elm.id === item.id);
      //update item to current item
      Object.assign(currentItem, item);
    } else {
      //else add new itme
      if (item.value && item.title) {
        //attach unique id
        if (this.expenseList.length > 0) {
          item.id = this.expenseList[this.expenseList.length - 1].id + 1;
        } else {
          item.id = 0;
        }

        this.expenseList.push(item);
      } else {
        throw new Error("please enter correct data");
      }
    }

    //trigger app change event
    this.events.trigger("change");
  };

  //remove list item from expense list
  public removeListItem = (id: number): void => {
    const index = this.expenseList.findIndex(
      (item: ExpenseList): boolean => item.id === id
    );

    const item = this.expenseList.splice(index, 1);

    //trigger app change event
    this.events.trigger("change");
  };

  //update existing list item from expense list
  public updateListItem = (id: number, updatedItem: ExpenseList): void => {
    const replaceWith = this.expenseList.find(
      (item: ExpenseList): boolean => item.id === id
    );

    if (replaceWith) {
      replaceWith.title = updatedItem.title;
      replaceWith.value = updatedItem.value;
    } else {
      throw new Error("trying to update the item which is not existed!");
    }

    //trigger app change event
    this.events.trigger("change");
  };
}
