import { ITransaction } from "../../domain/entities/ITransaction";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { supabase } from "./config";

export class TransactionSupabaseRepository implements ITransactionRepository {
  async create(value: number, typeId: number, userId: string) {
    const { error } = await supabase
      .from("transaction")
      .insert({ transaction_type_id: typeId, user_id: userId, value });

    if (error) throw error;
  }

  async listAll() {
    const { data, error } = await supabase
      .from("transaction")
      .select(`*, transaction_type(id, display)`);

    if (error) throw error;

    const result = data.map<ITransaction>(({ id, value, ...row }) => ({
      date: new Date(row.created_at),
      id,
      value,
      type: row.transaction_type,
    }));

    return result;
  }
}
