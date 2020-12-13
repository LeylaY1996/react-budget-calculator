import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuid } from "uuid";
import React, { useState,useEffect } from "react";

/* const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1620 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 },
]; */


const initialExpenses = localStorage.getItem('expenses') 
        ? JSON.parse(localStorage.getItem('expenses')) 
        : []; 

function App() {
  // ************* state values *************
  // *all expenses, add expense*
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");

  // edit 
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);

  // Alert
  const [alert, setAlert] = useState({ show: false })
  // functionality


  useEffect(()=>{
    console.log("we called useEffect")
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[])
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
      if(edit){
        let tempExpenses =  expenses.map(item=>{
           return item.id === id?{...item,charge,amount}:item
        });
        setExpenses(tempExpenses);
        setEdit(false)
        handleAlert({type:"success",text:"item edited"})


      }else {
        const singleExpense = { id: uuid(), charge, amount };
  
        // expenses üstüne set et demek
        setExpenses([...expenses, singleExpense]);
  
        handleAlert({type:"success",text:"item added"})
      }
      setCharge(" ");
      setAmount(" ");
    } else {
      // handle alert called
      handleAlert({type:"danger",text:"item not added"})

    }
  };

  /* Clear items */
  const clearItems = () => {
    console.log("cleared all items")
    setExpenses([]);
    handleAlert({type: "danger",text: "All item deleted"})

  }

  // Handle delete
  const handleDelete = (id) => {
    console.log(`item deleted: ${id}`)
    let tempExpenses = expenses.filter(item => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses)
    handleAlert({type: "danger",text: "Item deleted"})
  }

  // Handle edit
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge,amount} = expense;
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert/>
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
          expenses={expenses} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          clearItems={clearItems} 
        />
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
