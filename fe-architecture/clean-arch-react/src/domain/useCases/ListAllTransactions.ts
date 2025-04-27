import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class ListAllTransactions {
  constructor(private repository: ITransactionRepository) {}

  async execute() {
    return this.repository.listAll();
  }
}
