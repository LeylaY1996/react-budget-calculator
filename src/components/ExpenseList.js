import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export const ExpenseList = ({ expenses }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          console.log("expense list", expense.charge);
          return <Item key={expense.id} expense={expense} />;
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn">
          Clear expenses
          <MdDelete className="btn-icon"></MdDelete>
        </button>
      )}
    </>
  );
};
export default ExpenseList;
