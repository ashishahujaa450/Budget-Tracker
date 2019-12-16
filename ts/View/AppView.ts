import { View } from "./View";
import { Budget } from "../Model/Budget";

import { DashboardView } from "./DashboardView";
import { BudgetView } from "./BudgetView";
import { ExpenseAdderView } from "./ExpenseAdderView";
import { ExpenseListingView } from "./ExpenseListingView";
import { IncomeAdderView } from "./IncomeAdderView";

export class AppView extends View<Budget> {
  template(): string {
    return `
   
    <div class="row">
    <div class="col-11 mx-auto pt-3">
        <!-- title -->
        <h3 class="text-uppercase mb-4">budget app</h3>
        <div class="row">
            <div class="col-md-4 my-3 budget-view" id="budgetView">
                <!-- budget feedback -->
                <div class="budget-feedback alert alert-danger text-capitalize">
                    budget feedback
                </div>
                <!-- budget form -->
            </div>
            <div class="col-md-8" id="dashboardView">
                <!-- app info -->
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 my-3" id="expenseAdderView">
                <!-- expense feedback -->
                <div class="expense-feedback alert alert-danger text-capitalize">
                    expense feedback
                </div>
                <!-- expense form -->
            </div>
            <div class="col-md-8 my-3">
                <div class="expense-list__info d-flex justify-content-between text-capitalize">
                    <h5 class="list-item">expense title</h5>
                    <h5 class="list-item">expense value</h5>
                    <h5 class="list-item"></h5>
                </div>
                <!-- expense list -->
                <div class="row">

                    <div class="col-md-6">
                        <div class="expense-list" id="expense-list">

                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="income-list" id="income-list">

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 my-3" id="incomeAdderView">
                <!-- expense feedback -->
                <div class="expense-feedback alert alert-danger text-capitalize">
                    expense feedback
                </div>
                <!-- expense form -->
            </div>
        </div>
    </div>
</div>
      `;
  }

  eventsMap(): { [key: string]: (event: Event) => void } {
    return {};
  }

  regionsMap = (): { [key: string]: string } => {
    return {
      BudgetView: "#budgetView",
      DashboardView: "#dashboardView",
      ExpenseAdderView: "#expenseAdderView",
      ExpenseListingView: "#expense-list",
      incomeAdderView: "#incomeAdderView"
    };
  };

  onRender = (): void => {
    console.log(this.model);
    new BudgetView(this.regions.BudgetView, this.model).render();
    new DashboardView(this.regions.DashboardView, this.model).render();
    new ExpenseAdderView(this.regions.ExpenseAdderView, this.model).render();
    new ExpenseListingView(
      this.regions.ExpenseListingView,
      this.model
    ).render();
    new IncomeAdderView(this.regions.incomeAdderView, this.model).render();
  };
}
