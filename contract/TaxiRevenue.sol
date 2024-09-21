// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxiRevenue {

    struct Trip {
        string destination;
        uint256 fare; // in wei (smallest unit of ether)
        uint256 passengers;
        address driver;
        string paymentMethod; // "Cash" or "Mobile Payment"
        uint256 date;
    }

    struct Expense {
        string expenseType;
        uint256 amount; // in wei
        uint256 date;
    }

    address public owner; // Taxi operator (app admin)
    uint256 public totalRevenue;
    uint256 public totalExpenses;

    mapping(address => uint256) public driverEarnings; // Track earnings by driver
    Trip[] public trips; // Store all trips
    Expense[] public expenses; // Store all expenses

    constructor() {
        owner = msg.sender;
    }

    // Modifier to allow only the owner to perform certain actions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Add a trip to the system
    function addTrip(
        string memory _destination,
        uint256 _fare,
        uint256 _passengers,
        address _driver,
        string memory _paymentMethod,
        uint256 _date
    ) public onlyOwner {
        trips.push(Trip(_destination, _fare, _passengers, _driver, _paymentMethod, _date));
        totalRevenue += _fare; // Increase total revenue
        driverEarnings[_driver] += _fare; // Add earnings to driver
    }

    // Add an expense to the system
    function addExpense(string memory _expenseType, uint256 _amount, uint256 _date) public onlyOwner {
        expenses.push(Expense(_expenseType, _amount, _date));
        totalExpenses += _amount; // Increase total expenses
    }

    // Get the net profit (total revenue minus total expenses)
    function getNetProfit() public view returns (uint256) {
        return totalRevenue - totalExpenses;
    }

    // Withdraw earnings for a driver
    function withdrawEarnings() public {
        uint256 earnings = driverEarnings[msg.sender];
        require(earnings > 0, "No earnings to withdraw");

        driverEarnings[msg.sender] = 0; // Reset the driver's earnings
        payable(msg.sender).transfer(earnings); // Send earnings to driver
    }

    // Fallback function to receive Ether (in case drivers pay with Ether)
    receive() external payable {}

    // Withdraw total profit by the owner
    function withdrawProfit() public onlyOwner {
        uint256 profit = getNetProfit();
        require(profit > 0, "No profit to withdraw");

        payable(owner).transfer(profit); // Send the profit to the owner
    }

    // Get all trips (not recommended for large datasets - may be optimized further)
    function getAllTrips() public view returns (Trip[] memory) {
        return trips;
    }

    // Get all expenses (not recommended for large datasets)
    function getAllExpenses() public view returns (Expense[] memory) {
        return expenses;
    }
}
