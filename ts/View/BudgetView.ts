import { View } from "./View";
import { Budget } from "./../Model/Budget";

export class BudgetView extends View<Budget> {
  eventsMap(): { [key: string]: (event: Event) => void } {
    return {
      "click: .budget-submit": this.onBudgetClick
    };
  }

  onBudgetClick = (event: Event): void => {
    event.preventDefault();

    var inputValue = (<HTMLInputElement>document.getElementById("budget-input"))
      .value;
    if (this.validator(inputValue)) {
      this.model.data.totalBudget = parseInt(inputValue);
      this.model.trigger("change");
    } else {
      alert("please enter correct value");
    }
  };

  template(): string {
    return `
    <form id="budget-form" class=" budget-form">
        <h5 class="text-capitalize">please enter your budget</h5>
        <div class="form-group">
        <input type="number" class="form-control budget-input" id="budget-input">
        </div>
        <!-- submit button -->
        <button type="submit" class="btn text-capitalize budget-submit" id="budget-submit">
        calculate
        </button>
    </form>
      `;
  }
}
