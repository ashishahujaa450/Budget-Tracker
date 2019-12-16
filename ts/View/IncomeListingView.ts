import { View } from "./View";
import { Budget } from "../Model/Budget";

export class IncomeListingView extends View<Budget> {
  template(): string {
    let html = ``;

    this.model.income.list.incomeList.forEach(item => {
      html += `
       <div class="income">
        <div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="income-title mb-0 text-uppercase list-item text-left">${item.title}</h6>
        <h5 class="income-amount mb-0 list-item">${item.value}</h5>

        <div class="expense-icons list-item">

        <a href="#" class="edit-icon-income mx-2" data-id="${item.id}">
        <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon-income" data-id="${item.id}">
        <i class="fas fa-trash"></i>
        </a>
        </div>
        </div>
    </div>    
       `;
    });

    return html;
  }

  eventsMap(): { [key: string]: (event: Event) => void } {
    return {
      "click: .delete-icon-income": this.deleteListItemFromViewInc,
      "click: .edit-icon-income": this.editListItemFromViewInc
    };
  }

  deleteListItemFromViewInc = (e): void => {
    e.preventDefault();
    const itemId: string = e.target.parentElement.getAttribute("data-id");
    this.model.income.list.removeListItem(parseInt(itemId), "income");
  };

  editListItemFromViewInc = (e): void => {
    const itemId: string = e.target.parentElement.getAttribute("data-id");

    const incomeInput = <HTMLInputElement>(
      document.getElementById("income-expense-input")
    );

    //will fix this any type
    const incomeValue: any = document.getElementById("income-amount-input");

    //finding item with the id from the expense list
    const item = this.model.income.list.incomeList.find((current): boolean => {
      return current.id === parseInt(itemId);
    });

    //updaing ui
    incomeInput.value = item.title;
    incomeValue.value = item.value;
    incomeInput.setAttribute("data-id", item.id.toString());
  };
}
