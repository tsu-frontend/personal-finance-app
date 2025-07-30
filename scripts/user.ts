console.log('log')

interface UserType {
  id: string;
  email: string;
  name: string;
}
type TTransaction = {};
type TBudget = {};
type TPot = {};
type TBalance = {};

export class User {
  private id: string;
  public email: string;
  public name: string;
  //   public createdAt: string;
  public getTransactions: () => TTransaction[];
  public getBudgets: () => TBudget[];
  public getPots: () => TPot[];
  public getBalance: () => TBalance;

  static currentUser: UserType | null = null;

  constructor() {
    // this.id = data.id;
    // this.email = data.email;
    // this.name = data.name;
console.log('log')
  }
}

