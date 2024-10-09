import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./styles.css"; // Import your styles
import { auth } from "../../config/firebase-config"; // Firebase authentication

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction(); // Use the custom hook to add a transaction
  const { transactions, transactionTotals } = useGetTransactions(); // Fetch existing transactions
  const { name, profilePhoto } = useGetUserInfo(); // Get user info like name and profile picture
  const navigate = useNavigate();

  const [description, setDescription] = useState(""); // State for transaction description
  const [transactionAmount, setTransactionAmount] = useState(0); // State for transaction amount
  const [transactionType, setTransactionType] = useState("expense"); // State for transaction type (expense or income)

  const { balance, income, expenses } = transactionTotals; // Get totals from transactions

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Ensure valid transaction amount and format the number
    const formattedAmount = parseFloat(transactionAmount).toFixed(2); // Convert to float and format to two decimal places

    // Add transaction using the hook
    addTransaction({
      description,
      transactionAmount: formattedAmount, // Use the formatted amount
      transactionType,
    });

    // Clear form inputs after submission
    setDescription("");
    setTransactionAmount("");
  };

  // Function to sign the user out
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Return statement for rendering the component's JSX
  return (
    <>
      <div className="expense-tracker-container">
        <h1>{name}'s Expense Tracker</h1>

        {/* User Avatar */}
        {profilePhoto && (
          <div className="profile">
            <img className="avatar" alt="Profile" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}

        {/* Balance Section */}
        <div className="balance-section">
          <h2>Your Balance</h2>
          <div className="balance">
            {balance >= 0 ? `$${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`}
          </div>
        </div>

        {/* Income & Expenses Summary */}
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>${income.toFixed(2)}</p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>${expenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Transaction Form */}
        <form className="add-transaction" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
          />

          {/* Transaction Type (Income or Expense) */}
          <div className="transaction-type">
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
          </div>

          <button type="submit">Add Transaction</button>
        </form>
      </div>

      {/* Transaction List */}
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <li key={index} className={`transaction ${transactionType}`}>
                <span>{description}</span>
                <span className="amount">
                  {transactionType === "expense" ? "-" : "+"}${parseFloat(transactionAmount).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
