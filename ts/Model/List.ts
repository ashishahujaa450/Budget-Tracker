import { Eventing } from "./Eventing";
import { textSpanIsEmpty } from "typescript";

export interface ListAble {
  title?: string;
  value?: number;
  id?: number;
}

export class List {
  public expenseList: ListAble[] = [];
  public events: Eventing = new Eventing();
  public incomeList: ListAble[] = [];

  public listing: { [key: string]: ListAble[] } = {
    expenseListing: this.expenseList,
    incomeListing: this.incomeList
  };

  public addListItem = (item: ListAble, type: string): void => {
    //checking if already have id than just update the existed item
    if (item.id >= 0) {
      const currentItem = this.listing[`${type}Listing`].find(
        elm => elm.id === item.id
      );
      //update item to current item
      Object.assign(currentItem, item);
    } else {
      //else add new itme
      if (item.value && item.title) {
        //attach unique id
        if (this.listing[`${type}Listing`].length > 0) {
          item.id =
            this.listing[`${type}Listing`][
              this.listing[`${type}Listing`].length - 1
            ].id + 1;
        } else {
          item.id = 0;
        }

        this.listing[`${type}Listing`].push(item);
      } else {
        throw new Error("please enter correct data");
      }
    }

    //trigger app change event
    this.events.trigger("change");
  };

  //remove list item from expense list
  public removeListItem = (id: number, type: string): void => {
    const index = this.listing[`${type}Listing`].findIndex(
      (item: ListAble): boolean => item.id === id
    );

    const item = this.listing[`${type}Listing`].splice(index, 1);

    //trigger app change event
    this.events.trigger("change");
  };

  //update existing list item from expense list
  public updateListItem = (
    id: number,
    updatedItem: ListAble,
    type: string
  ): void => {
    const replaceWith = this.listing[`${type}Listing`].find(
      (item: ListAble): boolean => item.id === id
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
