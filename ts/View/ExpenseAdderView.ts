import { View } from "./View";
import { Budget } from "../Model/Budget";

export class ExpenseAdderView extends View<Budget> {
  template(): string {
    return `
    <form id="expense-form" class=" expense-form">
        <h5 class="text-capitalize">please enter your expense</h5>
        <div class="form-group">
        <input type="text" class="form-control expense-input" id="expense-input">
        </div>
        <h5 class="text-capitalize">please enter expense amount</h5>
        <div class="form-group">
        <input type="number" class="form-control expense-input" id="amount-input">
        </div>
        <!-- submit button -->
        <button type="submit" class="btn text-capitalize expense-submit" id="expense-submit">
        add expense
        </button>
    </form>
        `;
  }

  eventsMap(): { [key: string]: (event: Event) => void } {
    return {
      "click: .expense-submit": this.addExpense
    };
  }

  addExpense = (): void => {
    const expenseTitleValue = (<HTMLInputElement>(
      document.getElementById("expense-input")
    )).value;
    const expenseAmountValue = (<HTMLInputElement>(
      document.getElementById("amount-input")
    )).value;

    if (
      this.validator(expenseTitleValue) &&
      this.validator(expenseAmountValue)
    ) {
      //change the model
      const expenseItem = {
        title: expenseTitleValue,
        value: parseInt(expenseAmountValue)
      };

      this.model.expense.addListItem(expenseItem);
      this.model.trigger("change");
    } else {
      alert("please enter correct data");
    }
  };
}
