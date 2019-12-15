import { Budget } from "./Model/Budget";
import { DashboardView } from "./View/DashboardView";

const item = new Budget({ totalBudget: 5000 });

item.addListItem({
  title: "attached item",
  value: 100
});

item.addListItem({
  title: "exp",
  value: 500
});

item.addListItem({
  title: "new attached item",
  value: 2100
});

item.addListItem({
  title: "car purchase",
  value: 200
});

item.addListItem({
  title: "laptop accessories",
  value: 150
});

item.removeListItem(3);

item.addListItem({
  title: "final exp",
  value: 500
});

item.removeListItem(4);

item.updateListItem(2, { title: "updatedTitle", value: 2100 });

import { BudgetView } from "./View/BudgetView";
import { ExpenseAdderView } from "./View/ExpenseAdderView";
import { ExpenseListingView } from "./View/ExpenseListingView";

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
