import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { supabase } from "./config";

export class TransactionSupabaseRepository implements ITransactionRepository {
  async create(value: number, typeId: number, userId: string) {
    const { error } = await supabase
      .from("transaction")
      .insert({ transaction_type_id: typeId, user_id: userId, value });

    if (error) throw error;
  }
}
