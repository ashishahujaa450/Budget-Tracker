import { View } from "./View";
import { Budget } from "../Model/Budget";

import { DashboardView } from "./DashboardView";
import { BudgetView } from "./BudgetView";
import { ExpenseAdderView } from "./ExpenseAdderView";
import { ExpenseListingView } from "./ExpenseListingView";

export class AppView extends View<Budget> {
  template(): string {
    return `
   
        <div class="row">
            <div class="col-11 mx-auto pt-3">
                <!-- title -->
                <h3 class="text-uppercase mb-4">budget app</h3>
                <div class="row">
                    <div class="col-md-5 my-3 budget-view" id="budgetView">
                        <!-- budget feedback -->
                        <div class="budget-feedback alert alert-danger text-capitalize">
                            budget feedback
                        </div>
                        <!-- budget form -->
                    </div>
                    <div class="col-md-7" id="dashboardView">
                        <!-- app info -->
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 my-3" id="expenseAdderView">
                        <!-- expense feedback -->
                        <div class="expense-feedback alert alert-danger text-capitalize">
                            expense feedback
                        </div>
                        <!-- expense form -->
                    </div>
                    <div class="col-md-7 my-3">
                        <!-- expense list -->
                        <div class="expense-list" id="expense-list">
                            <div class="expense-list__info d-flex justify-content-between text-capitalize">
                                <h5 class="list-item">expense title</h5>
                                <h5 class="list-item">expense value</h5>
                                <h5 class="list-item"></h5>
                            </div>
                        </div>
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
      ExpenseListingView: "#expense-list"
    };
  };

  onRender = (): void => {
    console.log(this.regions);
    new BudgetView(this.regions.BudgetView, this.model).render();
    new DashboardView(this.regions.DashboardView, this.model).render();
    new ExpenseAdderView(this.regions.ExpenseAdderView, this.model).render();
    new ExpenseListingView(
      this.regions.ExpenseListingView,
      this.model
    ).render();
  };
}
