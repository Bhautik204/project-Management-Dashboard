import React from "react";

const BudgetOverview = () => {
  const budgetData = {
    totalSales: 50000,
    projectBudget: 30000,
    expenses: 15000,
  };

  return (
    <div className='w-full bg-white p-4 rounded shadow-md'>
      <h4 className='text-xl font-semibold'>Budget Overview</h4>
      <div className='mt-4'>
        <p>Total Sales: ${budgetData.totalSales}</p>
        <p>Project Budget: ${budgetData.projectBudget}</p>
        <p>Expenses: ${budgetData.expenses}</p>
      </div>
    </div>
  );
};

export default BudgetOverview;
