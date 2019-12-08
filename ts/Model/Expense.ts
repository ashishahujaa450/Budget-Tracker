import { Eventing } from "./Eventing";

interface ExpenseList {
  title: string;
  value: number;
  id?: number;
}

export class Expense {
  totalExpense: number = 0;
  expenseList: ExpenseList[] = [];

  events: Eventing = new Eventing();

  constructor() {
    this.bindChange();
  }

  //bind change
  bindChange = (): void => {
    this.events.on("change", () => {
      this.updateTotalExpense();
    });
  };

  //updating total expense
  updateTotalExpense = (): void => {
    let expense: number = 0;
    this.expenseList.forEach(item => {
      expense += item.value;
    });

    this.totalExpense = expense;
  };

  //add list item to expense list
  addListItem = (item: ExpenseList): void => {
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

    //trigger app change event
    this.events.trigger("change");
  };

  //remove list item from expense list
  removeListItem = (id: number): void => {
    const index = this.expenseList.findIndex(
      (item: ExpenseList): boolean => item.id === id
    );

    this.expenseList.splice(index, 1);

    //trigger app change event
    this.events.trigger("change");
  };

  //update existing list item from expense list
  updateListItem = (id: number, updatedItem: ExpenseList): void => {
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
