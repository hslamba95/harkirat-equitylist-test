// Define the sample ledger data
const ledger = [
    {
        "activity_id": "1",
        "date": "2014-10-01T01:00:29+00:00",
        "type": "DEPOSIT",
        "method": "ACH",
        "amount": 1003.75,
        "balance": 1003.75,
        "requester": {
            "type": "INVESTMENT"
        },
        "source": {
            "type": "EXTERNAL",
            "id": 18238147,
            "description": "Chase ** 9867"
        },
        "destination": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        }
    },
    {
        "activity_id": "2",
        "date": "2014-10-01T01:00:30+00:00",
        "type": "INVESTMENT",
        "amount": -999.50,
        "balance": 4.25,
        "requester": {
            "type": "INVESTMENT"
        },
        "source": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Investor description"
        },
        "destination": {
            "type": "CAMPAIGN_FUND",
            "id": "899b188040fd01315c6206cbae434dcb",
            "description": "Uber Technologies"
        }
    },
    {
        "activity_id": "3",
        "date": "2014-10-02T00:00:30+00:00",
        "type": "REFUND",
        "amount": 500,
        "balance": 504.25,
        "requester": {
            "type": "INVESTMENT"
        },
        "source": {
            "type": "CAMPAIGN_FUND",
            "id": "899b188040fd01315c6206cbae434dcb",
            "description": "Uber Technologies"
        },
        "destination": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        }
    },
    {
        "activity_id": "4",
        "date": "2014-10-03T10:30:30+00:00",
        "type": "WITHDRAWAL",
        "method": "ACH",
        "amount": -515.00,
        "balance": 0,
        "source": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        },
        "destination": {
            "type": "EXTERNAL",
            "id": 18238147,
            "description": "Chase ** 9867"
        }
    },
    {
        "activity_id": "4",
        "date": "2014-10-03T10:30:30+00:00",
        "type": "WITHDRAWAL",
        "method": "ACH",
        "amount": -515.00,
        "balance": 0,
        "source": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        },
        "destination": {
            "type": "EXTERNAL",
            "id": 18238147,
            "description": "Chase ** 9867"
        }
    },
    {
        "activity_id": "5",
        "date": "2014-10-03T09:30:30+00:00",
        "type": "TRANSFER",
        "amount": 10.75,
        "balance": 515.0,
        "source": {
            "type": "ISSUER",
            "id": 521063487980,
            "description": "Twitter"
        },
        "destination": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        }
    },
    {
        "activity_id": "6",
        "date": "2014-10-03T12:30:30+00:00",
        "type": "TRANSFER",
        "amount": -90.25,
        "balance": 4909.75,
        "source": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        },
        "destination": {
            "type": "SPECIAL_ACCOUNT",
            "description": "Failed ACH Recovery"
        }
    },
    {
        "activity_id": "7",
        "date": "2014-10-03T12:30:30+00:00",
        "type": "DEPOSIT",
        "method": "WIRE",
        "amount": 5000.0,
        "balance": 5000.0,
        "source": { "type": "EXTERNAL" },
        "destination": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        }
    },
    {
        "activity_id": "8",
        "date": "2014-10-04T00:16:47+00:00",
        "type": "DEPOSIT",
        "method": "ACH",
        "amount": 0.25,
        "balance": 4910,
        "source": {
            "type": "EXTERNAL",
            "id": null
        },
        "destination": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        }
    }
];

// Remove duplicate entries
const uniqueLedger = removeDuplicates(ledger);

// Function to calculate account balance
function calculateAccountBalance(transactions) {
    return transactions.reduce((balance, transaction) => balance + transaction.amount, 0);
}

// Calculate account balance
const accountBalance = calculateAccountBalance(uniqueLedger);

// Define the date range
const startDate = new Date("2014-08-19");
const endDate = new Date("2014-10-15");

// Function to format date to MM/DD/YYYY
function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Update the content of the h1 element
const h1Element = document.querySelector('h1');
h1Element.innerHTML = `
    Your investing account ($${accountBalance.toFixed(2)} available)
    <div class="small">${formatDate(startDate)} - ${formatDate(endDate)}</div>
`;

// Function to calculate balance for each transaction
/*
calculates the balance for each transaction by iterating through the ledger data and updating the balance accordingly.
For each transaction, it adds the transaction amount to the previous balance to calculate the new balance.
 */
function calculateBalance(transactions) {
    let balance = 0;
    transactions.forEach(transaction => {
        balance += transaction.amount;
        transaction.balance = balance;
    });
}

// Function to remove duplicate entries based on activity_id
function removeDuplicates(transactions) {
    const uniqueTransactions = [];
    const activityIds = new Set();

    transactions.forEach(transaction => {
        if (!activityIds.has(transaction.activity_id)) {
            uniqueTransactions.push(transaction);
            activityIds.add(transaction.activity_id);
        }
    });

    return uniqueTransactions;
}

// Function to display ledger
/*
responsible for rendering the ledger data onto an HTML table.
It clears any existing rows in the table's body to ensure a clean display.
It then iterates through each transaction in the ledger data, formatting the transaction details into table rows and appending them to the table's body.
 */
function displayLedger(ledgerData) {
    const sortedLedger = ledgerData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const ledgerBody = document.getElementById('ledger-body');
    ledgerBody.innerHTML = ''; // Clear existing rows

    sortedLedger.forEach(transaction => {
        const date = new Date(transaction.date).toLocaleDateString();
        const sourceDescription = transaction.source && transaction.source.description ? transaction.source.description : 'Unknown Source';
        const destinationDescription = transaction.destination && transaction.destination.description ? transaction.destination.description : 'Unknown Destination';
        const row = `
            <tr>
                <td>${date}</td>
                <td>${transaction.type}</td>
                <td>${destinationDescription} from ${sourceDescription}</td>
                <td>$${transaction.amount}</td>
                <td>$${transaction.balance}</td>
            </tr>
        `;
        ledgerBody.insertAdjacentHTML('beforeend', row);
    });
}

// Calculate balance for each transaction
calculateBalance(uniqueLedger);

// Display ledger
displayLedger(uniqueLedger);
