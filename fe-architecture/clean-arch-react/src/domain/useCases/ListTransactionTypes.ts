import { ITransactionTypeRepository } from "../repositories/ITransactionTypeRepository";

export class ListTransactionTypes {
  constructor(private repository: ITransactionTypeRepository) {}

  async execute() {
    return this.repository.listAll();
  }
}
