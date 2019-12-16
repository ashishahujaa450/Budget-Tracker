import { View } from "./View";
import { Budget } from "../Model/Budget";

export class ExpenseListingView extends View<Budget> {
  template(): string {
    let html = ``;

    this.model.expense.list.expenseList.forEach(item => {
      html += `
       <div class="expense">
        <div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="expense-title mb-0 text-uppercase list-item text-left">${item.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${item.value}</h5>

        <div class="expense-icons list-item">

        <a href="#" class="edit-icon-expense mx-2" data-id="${item.id}">
        <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon-expense" data-id="${item.id}">
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
      "click: .delete-icon-expense": this.deleteListItemFromView,
      "click: .edit-icon-expense": this.editListItemFromView
    };
  }

  deleteListItemFromView = (e): void => {
    const itemId: string = e.target.parentElement.getAttribute("data-id");
    this.model.expense.list.removeListItem(parseInt(itemId), "expense");
  };

  editListItemFromView = (e): void => {
    const itemId: string = e.target.parentElement.getAttribute("data-id");

    const expenseInput = <HTMLInputElement>(
      document.getElementById("expense-input")
    );

    //will fix this any type
    const expenseValue: any = document.getElementById("amount-input");

    //finding item with the id from the expense list
    const item = this.model.expense.list.expenseList.find(
      (current): boolean => {
        return current.id === parseInt(itemId);
      }
    );

    //updaing ui
    expenseInput.value = item.title;
    expenseValue.value = item.value;
    expenseInput.setAttribute("data-id", item.id.toString());
  };
}
