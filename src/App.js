import React, { useState } from 'react';
import AddTrip from './components/AddTrip';
import RevenueSummary from './components/RevenueSummary';
import ExpenseTracking from './components/ExpenseTracking';
import './App.css';

// Define your contract ABI and address
const contractAddress = "0xYourContractAddress";  // Replace with your contract address
const contractABI = [
  // Paste the contract ABI here
];

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const drivers = ['0xDriverAddress1', '0xDriverAddress2', '0xDriverAddress3']; // Example driver addresses

  // Initialize ethers.js and the contract
  useEffect(() => {
    const initEthers = async () => {
      // Connect to MetaMask's provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Request access to the user's MetaMask wallet
      await provider.send("eth_requestAccounts", []);

      // Get the signer (account connected to MetaMask)
      const signer = provider.getSigner();
      setSigner(signer);

      // Create contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract);
    };

    initEthers();
  }, []);

  // Add a trip to the smart contract
  const handleAddTrip = async (tripData) => {
    if (contract) {
      try {
        const tx = await contract.addTrip(
          tripData.destination,
          ethers.utils.parseUnits(tripData.fare, 'wei'), // Convert fare to wei
          tripData.passengers,
          tripData.driver,
          tripData.paymentMethod,
          tripData.date
        );
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Trip added:", tx);
      } catch (error) {
        console.error("Error adding trip:", error);
      }
    }
  };

  // Add an expense to the smart contract
  const handleAddExpense = async (expenseData) => {
    if (contract) {
      try {
        const tx = await contract.addExpense(
          expenseData.type,
          ethers.utils.parseUnits(expenseData.amount, 'wei'), // Convert amount to wei
          expenseData.date
        );
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Expense added:", tx);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Taxi Operator Dashboard (Blockchain Integrated)</h1>
      <div className="form-row">
        <div className="form-card">
          <AddTrip onAddTrip={handleAddTrip} drivers={drivers} />
        </div>
        <div className="form-card">
          <ExpenseTracking expenses={expenses} onAddExpense={handleAddExpense} />
        </div>
      </div>
      {/* Display summary or any additional data */}
    </div>
  );
};

export default App;
