import { View } from "./View";
import { Budget } from "./../Model/Budget";
export class DashboardView extends View<Budget> {
  template(): string {
    return `
    <div class="row my-3">
        <div class="col-4 text-center mb-2">
        <h6 class="text-uppercase info-title">budget</h6>
        <span class="budget-icon"><i class="fas fa-money-bill-alt"></i></span>
        <h4 class="text-uppercase mt-2 budget" id="budget">
            <span>$ </span><span id="budget-amount">${this.model.data.totalBudget}</span>
        </h4>
        </div>
        <div class="col-4 text-center">
        <h6 class="text-uppercase info-title">expenses</h6>
        <span class="expense-icon"><i class="far fa-credit-card"></i></span>
        <h4 class="text-uppercase mt-2 expense" id="expense">
            <span>$ </span><span id="expense-amount">${this.model.expense.totalExpense}</span>
        </h4>
        </div>
        <div class="col-4 text-center">
        <h6 class="text-uppercase info-title">balance</h6>
        <span class="balance-icon"><i class="fas fa-dollar-sign"></i></span>
        <h4 class="text-uppercase mt-2 balance" id="balance">
            <span>$ </span><span id="balance-amount">${this.model.balance}</span>
        </h4>
        </div>
    </div>
      `;
  }

  eventsMap(): { [key: string]: (event: Event) => void } {
    return {};
  }
}
