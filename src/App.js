import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";

const initialExpenses = [
  /* { id: uuid(), charge: "rent", amount: 1620 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }, */
];

function App() {
  // ************* state values *************
  // *all expenses, add expense*
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");

  // Alert
  const [alert, setAlert] = useState({ show: false })
  // functionality
  const handleCharge = (e) => {
    console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    console.log(`amount: ${e.target.value}`);

    setAmount(e.target.value);
  };

  const handleAlert = ({type,text}) => {
    console.log("ELert",type,text)
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false});
    },10000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };

      // expenses üstüne set et demek
      setExpenses([...expenses, singleExpense]);

      handleAlert({type:"success",text:"item added"})
      setCharge(" ");
      setAmount(" ");
    } else {
      // handle alert called
      handleAlert({type:"danger",text:"item not added"})

    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert handleAlert={handleAlert}/>
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Toplam Harcama:{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
