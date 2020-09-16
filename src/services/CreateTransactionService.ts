import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('Invalid transaction type!');
    }

    const hasValidBalance = this.transactionsRepository.getBalance();

    if (hasValidBalance.total < value && type === 'outcome') {
      throw new Error('You not have a valid balance!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value
    });

    return transaction;
  }
}

export default CreateTransactionService;
