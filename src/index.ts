class Transaction {
    amount: number;
    date: Date;
    constructor(amount:number, date:Date) {
        this.amount = amount;
        this.date = date;
    }
}


class Customer {
    name: string;
    id: number;
    transactions: Transaction[];
    constructor(name:string, id:number) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getTransactions() {
        return this.transactions;
    }

    getBalance() {
        let balance = 0;
        for (let transaction of this.transactions) {
            balance += transaction.amount;
        }
        return Math.max(0, balance); 
    }

    addTransactions(amount:number) {
        const transaction = new Transaction(amount, new Date());
        this.transactions.push(transaction);
        return true;
    }
}


class Branch {
    name: string;
    customers: Customer[];
    constructor(name:string) {
        this.name = name;
        this.customers = [];
    }

    getName() {
        return this.name;
    }

    getCustomers() {
        return this.customers;
    }

    addCustomer(customer:Customer) {
        
        const existingCustomer = this.customers.find(c => c.getId() === customer.getId());
        if (existingCustomer) {
            return false; 
        }
        this.customers.push(customer);
        return true;
    }

    addCustomerTransaction(customerId:number, amount:number) {
        const customer = this.customers.find(c => c.getId() === customerId);
        if (customer) {
            return customer.addTransactions(amount);
        }
        return false; 
    }
}

class Bank {
    name: string;
    branches: Branch[];
    constructor(name:string) {
        this.name = name;
        this.branches = [];
    }

    addBranch(branch: Branch) {

        const existingBranch = this.branches.find(b => b.getName() === branch.getName());
        if (existingBranch) {
            return false; 
        }
        this.branches.push(branch);
        return true;
    }

    addCustomer(branch:Branch, customer: Customer) {
        
        if (!this.checkBranch(branch)) {
            return false; 
        }
        return branch.addCustomer(customer);
    }

    addCustomerTransaction(branch:Branch, customerId:number, amount:number) {
        
        if (!this.checkBranch(branch)) {
            return false;
        }
        return branch.addCustomerTransaction(customerId, amount);
    }

    findBranchByName(branchName:string) {
        const matchedBranches = this.branches.filter(branch => branch.getName() === branchName);
        return matchedBranches.length > 0 ? matchedBranches : null;
    }

    checkBranch(branch: Branch) {
        return this.branches.includes(branch);
    }

    listCustomers(branch:Branch, includeTransactions: boolean) {
        
        if (!this.checkBranch(branch)) {
            console.log("Branch does not belong to this bank.");
            return;
        }

        console.log(`Customers in ${branch.getName()} branch:`);
        const customers = branch.getCustomers();
        
        if (customers.length === 0) {
            console.log("No customers found.");
            return;
        }

        customers.forEach(customer => {
            console.log(`Customer: ${customer.getName()} (ID: ${customer.getId()}), Balance: $${customer.getBalance()}`);
            
            if (includeTransactions) {
                const transactions = customer.getTransactions();
                if (transactions.length > 0) {
                    console.log("  Transactions:");
                    transactions.forEach((transaction:boolean, index:number) => {
                        console.log(`    ${index + 1}. Amount: $${transaction.amount}, Date: ${transaction.date.toDateString()}`);
                    });
                } else {
                    console.log("  No transactions found.");
                }
            }
        });
    }
}