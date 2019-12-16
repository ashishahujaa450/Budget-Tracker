import { Eventing } from "./Eventing";

export interface IncomeList {
  title?: string;
  value?: number;
  id?: number;
}

export class Income {
  public totalIncome: number = 0;
  public IncomeList: IncomeList[] = [];
  public events: Eventing = new Eventing();

  constructor() {
    this.bindChange();
  }

  //bind change
  private bindChange = (): void => {
    this.events.on("change", () => {
      this.updateTotalIncome();
    });
  };

  //updating total expense
  private updateTotalIncome = (): void => {
    let expense: number = 0;
    this.IncomeList.forEach(item => {
      expense += item.value;
    });

    this.totalIncome = expense;
  };

  //add list item to expense list
  public addListItem = (item: IncomeList): void => {
    //checking if already have id than just update the existed item
    if (item.id >= 0) {
      const currentItem = this.IncomeList.find(elm => elm.id === item.id);
      //update item to current item
      Object.assign(currentItem, item);
    } else {
      //else add new itme
      if (item.value && item.title) {
        //attach unique id
        if (this.IncomeList.length > 0) {
          item.id = this.IncomeList[this.IncomeList.length - 1].id + 1;
        } else {
          item.id = 0;
        }

        this.IncomeList.push(item);
      } else {
        throw new Error("please enter correct data");
      }
    }

    //trigger app change event
    this.events.trigger("change");
  };

  //remove list item from expense list
  public removeListItem = (id: number): void => {
    const index = this.IncomeList.findIndex(
      (item: IncomeList): boolean => item.id === id
    );

    const item = this.IncomeList.splice(index, 1);

    //trigger app change event
    this.events.trigger("change");
  };

  //update existing list item from expense list
  public updateListItem = (id: number, updatedItem: IncomeList): void => {
    const replaceWith = this.IncomeList.find(
      (item: IncomeList): boolean => item.id === id
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
