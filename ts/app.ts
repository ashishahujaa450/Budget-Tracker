import { Budget } from "./Model/Budget";
import { AppView } from "./View/AppView";

const item = new Budget({ totalBudget: 0 });
const app = new AppView(document.getElementById("AppRoot"), item);

app.render();
