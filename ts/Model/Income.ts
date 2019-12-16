import { Eventing } from "./Eventing";
import { List } from "./List";

export interface IncomeList {
  title?: string;
  value?: number;
  id?: number;
}

export class Income {
  public totalIncome: number = 0;

  public events: Eventing = new Eventing();
  public list: List = new List();

  constructor() {
    this.bindChange();
  }

  //bind change
  private bindChange = (): void => {
    this.list.events.on("change", () => {
      this.updateTotalIncome();
    });
  };

  //updating total expense
  private updateTotalIncome = (): void => {
    let income: number = 0;
    this.list.incomeList.forEach(item => {
      income += item.value;
    });

    this.totalIncome = income;
  };
}
