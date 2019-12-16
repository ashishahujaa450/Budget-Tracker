import { View } from "./View";
import { Budget } from "../Model/Budget";
import { ExpenseList } from "../Model/Expense";

export class IncomeAdderView extends View<Budget> {
  template(): string {
    return `
    <form id="income-form" class="income-form">
        <h5 class="text-capitalize">please enter your Income</h5>
        <div class="form-group">
        <input type="text" class="form-control expense-input" id="income-expense-input">
        </div>
        <h5 class="text-capitalize">please enter Income amount</h5>
        <div class="form-group">
        <input type="number" class="form-control expense-input" id="income-amount-input">
        </div>
        <!-- submit button -->
        <button type="submit" class="btn text-capitalize income-submit" id="income-submit">
        add Income
        </button>
    </form>
        `;
  }

  eventsMap(): { [key: string]: (event: Event) => void } {
    return {
      "click: .income-submit": this.addIncome
    };
  }

  addIncome = (): void => {
    //getting dom data
    const incomeTitleValue = (<HTMLInputElement>(
      document.getElementById("income-expense-input")
    )).value;
    const incomeAmountValue = (<HTMLInputElement>(
      document.getElementById("income-amount-input")
    )).value;

    const incomeId = document
      .getElementById("income-expense-input")
      .getAttribute("data-id");
    const incomeItem: ExpenseList = {};

    //validate data first
    if (this.validator(incomeTitleValue) && this.validator(incomeAmountValue)) {
      if (incomeId) {
        //add item with id
        incomeItem.title = incomeTitleValue;
        incomeItem.value = parseInt(incomeAmountValue);
        incomeItem.id = parseInt(incomeId);
      } else {
        //add item without id
        incomeItem.title = incomeTitleValue;
        incomeItem.value = parseInt(incomeAmountValue);
      }
    } else {
      alert("please enter correct data");
    }

    //add item to model and indicating model
    this.model.income.list.addListItem(incomeItem, "income");
    this.model.trigger("change");
  };
}
