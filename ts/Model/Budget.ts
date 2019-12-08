interface ExpenseList {
  expenseTitle: string;
  expenseValue: number;
}

interface BudgetProps {
  totalBudget?: number;
  expenseList: ExpenseList[];
}

export class Budget {
  totalExpense: number;
  balance: number;

  constructor(public data: BudgetProps) {}

  //updating balancec
  updateBalance = (): void => {
    this.balance = this.data.totalBudget - this.totalExpense;
  };

  //updating total expense
  updateTotalExpense = (): void => {
    let expense: number = 0;
    this.data.expenseList.forEach(item => {
      expense += item.expenseValue;
    });

    this.totalExpense = expense;
  };
}
