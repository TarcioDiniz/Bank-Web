class Account {
    id: number;
    fullName: string;
    cpf: string;
    bankAccount: number;
    bankBranch: string;
    phoneContact: string;
    email: string;
    password: string;
    pixKeys: string[];
    quickTransferFriends: any[]; // Pode ser ajustado conforme a estrutura real dos amigos de transferência rápida
    creditCard: {
        cardNumber: string;
        expirationDate: string;
        cvv: string;
        creditLimit: number;
    };
    transactions: {
        id: number;
        transactionName: string;
        transactionCategory: string;
        transactionValue: number;
    }[];
    accountBalance: number;
    income: number;
    expenses: number;

    constructor(data: any) {
        this.id = data.id;
        this.fullName = data.fullName;
        this.cpf = data.cpf;
        this.bankAccount = data.bankAccount;
        this.bankBranch = data.bankBranch;
        this.phoneContact = data.phoneContact;
        this.email = data.email;
        this.password = data.password;
        this.pixKeys = data.pixKeys;
        this.quickTransferFriends = data.quickTransferFriends;
        this.creditCard = data.creditCard;
        this.transactions = data.transactions;
        this.accountBalance = data.accountBalance;
        this.income = data.income;
        this.expenses = data.expenses;
    }
}

export default Account;


