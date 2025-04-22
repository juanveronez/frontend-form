import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { supabase } from "./config";

export class UserSupabaseRepository implements IUserRepository {
  async createUser(user: Omit<IUser, "id">) {
    const { error, data } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: { emailRedirectTo: import.meta.env.VITE_URL },
    });

    if (error) {
      throw error;
    }

    return data.user!.id;
  }
}
