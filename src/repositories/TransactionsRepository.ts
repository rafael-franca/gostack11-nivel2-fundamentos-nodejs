import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.transactions;

    let income = 0;
    let outcome = 0;

    transactions.map(transaction => {
      if (transaction.type == 'income') {
        income += transaction.value;
      } else if (transaction.type == 'outcome') {
        outcome += transaction.value;
      } else {
        throw Error('Invalid transaction type!');
      }
    });

    const total = income - outcome;

    return {
      income,
      outcome,
      total
    };
  }

  public create(): Transaction {
    // TODO
  }
}

export default TransactionsRepository;
