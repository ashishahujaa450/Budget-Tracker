interface ExpenseList {
  title: string;
  value: number;
  id?: number;
}

export class Expense {
  totalExpense: number = 0;
  expenseList: ExpenseList[] = [];

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

    //calculating budget and exp
    this.updateTotalExpense();
    // this.updateBalance();
  };

  //remove list item from expense list
  removeListItem = (id: number): void => {
    const index = this.expenseList.findIndex(
      (item: ExpenseList): boolean => item.id === id
    );

    this.expenseList.splice(index, 1);

    //calculating budget and exp
    this.updateTotalExpense();
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

    //calculating budget and exp
    this.updateTotalExpense();
  };
}
