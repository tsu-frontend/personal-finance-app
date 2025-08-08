import { supabase } from "../supabaseClient";

type TTransaction = { id: string; amount: number; date: string };
type TBudget = { id: string; limit: number; category: string };
type TPot = { id: string; name: string; balance: number };
type TBalance = { total: number };

export class User {
  private id: string;
  public name: string;
  public email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  async getTransactions(): Promise<TTransaction[]> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", this.id);
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getBudgets(): Promise<TBudget[]> {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", this.id);
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getPots(): Promise<TPot[]> {
    const { data, error } = await supabase
      .from("pots")
      .select("*")
      .eq("user_id", this.id);
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getBalance(): Promise<TBalance> {
    const transactions = await this.getTransactions();
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    return { total };
  }
}
