import { View } from "./View";
import { Budget } from "../Model/Budget";
import { ExpenseList } from "../Model/Expense";

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
    //getting dom data
    const expenseTitleValue = (<HTMLInputElement>(
      document.getElementById("expense-input")
    )).value;
    const expenseAmountValue = (<HTMLInputElement>(
      document.getElementById("amount-input")
    )).value;

    const expenseId = document
      .getElementById("expense-input")
      .getAttribute("data-id");
    const expenseItem: ExpenseList = {};

    //validate data first
    if (
      this.validator(expenseTitleValue) &&
      this.validator(expenseAmountValue)
    ) {
      if (expenseId) {
        //add item with id
        expenseItem.title = expenseTitleValue;
        expenseItem.value = parseInt(expenseAmountValue);
        expenseItem.id = parseInt(expenseId);
      } else {
        //add item without id
        expenseItem.title = expenseTitleValue;
        expenseItem.value = parseInt(expenseAmountValue);
      }
    } else {
      alert("please enter correct data");
    }

    //add item to model and indicating model
    this.model.expense.list.addListItem(expenseItem, "expense");
    this.model.trigger("change");
  };
}
