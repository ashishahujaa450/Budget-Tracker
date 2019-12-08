import { Budget } from "./Model/Budget";
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

item.updateListItem(2, { title: "updatedTitle", value: 2100 });

console.log(item);
