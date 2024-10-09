import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from "../config/firebase-config"; // Firebase configuration
import { useGetUserInfo } from "./useGetUserInfo"; // Custom hook to get user info like userID

// Hook to handle adding transactions to Firestore
export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions"); // Reference to Firestore 'transactions' collection
  const { userID } = useGetUserInfo(); // Get the user ID using a custom hook

  // Function to add a transaction
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    try {
      // Add new transaction to Firestore with relevant fields
      await addDoc(transactionCollectionRef, {
        userID, // Associate transaction with the logged-in user's ID
        description, // Description of the transaction (e.g., "Groceries")
        transactionAmount: parseFloat(transactionAmount), // Convert transaction amount to a float
        transactionType, // Either "income" or "expense"
        createdAt: serverTimestamp(), // Auto-generated timestamp of when the transaction was added
      });
      console.log("Transaction successfully added!");
    } catch (error) {
      console.error("Error adding transaction: ", error); // Error handling
    }
  };

  return { addTransaction }; // Return the addTransaction function
};