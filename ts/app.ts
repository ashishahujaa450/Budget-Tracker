import { Budget } from "./Model/Budget";
import { DashboardView } from "./View/DashboardView";
import { BudgetView } from "./View/BudgetView";
import { ExpenseAdderView } from "./View/ExpenseAdderView";
import { ExpenseListingView } from "./View/ExpenseListingView";

const item = new Budget({ totalBudget: 0 });

const view = new BudgetView(document.getElementById("budgetView"), item);

const dashboard = new DashboardView(
  document.getElementById("dashboardView"),
  item
);

const expenseAdder = new ExpenseAdderView(
  document.getElementById("expenseAdderView"),
  item
);

const expenseListing = new ExpenseListingView(
  document.getElementById("expense-list"),
  item
);

view.render();
dashboard.render();
expenseAdder.render();
expenseListing.render();
