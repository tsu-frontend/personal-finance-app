import { ServiceManager } from "https://esm.sh/supabase-service-manager";

export interface UserType {
  id: string;
  email: string;
  name: string;
}
type TTransaction = [{}];
type TBudget = [{}];
type TPot = [{}];
type TBalance = [{}];

export class User {
  public id: string;
  public email: string;
  public name: string;
  public isUserSignedIn: boolean;
  private supaService: ServiceManager;

  constructor(supaService: ServiceManager) {
    this.init(supaService);
  }
  async init(service: ServiceManager) {
    const result = await service.getCurrentSession();
    this.supaService = service;
    if (result.success && result.data) {
      this.id = result.data.user.id;
      this.email = result.data.user.email;
      this.name = result.data.user.firstName;
      this.isUserSignedIn = !!this.id && !!this.email && !!this.name;
      console.log(this.isUserSignedIn);
    } else {
      console.log("not workign");
    }
    this.setup();
  }

  setup() {
    //setup when using user class as an instance
    console.log("works");
    if (this.isUserSignedIn) {
      // console.log(window.history.back());
      // window.location.href = `http://127.0.0.1:5505/pages/budgets.html`;
    }
  }

  async getTransaction() {
    console.log(this.supaService);
    
    const result = await this.supaService.list("transactions");
    if (result.success) {
      console.log(result.data);

      return result.data;
    } else {
      console.log("error");
    }
  }

  async getBudget() {
    const result = await this.supaService.list("budgets");
    if (result.success) {
      // console.log(result.data);
      return result.data;
    } else {
      console.log("error");
    }
  }
  async getPot() {
    const result = await this.supaService.list("pots");
    if (result.success) {
      console.log(result.data);
      return result.data;
    } else {
      console.log("error");
    }
  }
  async getBalance() {
    const result = await this.supaService.list("balance");

    if (result.success) {
      console.log(result.data);
      return result.data;
    } else {
      console.log("error");
    }
  }
}

export class UserTransactions extends User {
  constructor(supaService: ServiceManager) {
    super(supaService);
  }
  setup() {
    this.getTransaction();
  }
}

export class UserBudgets extends User {
  public userBData: any;
  public userTrData: any;

  constructor(supaService: ServiceManager) {
    super(supaService);
  }
  public async setup() {
    const budget = await this.getBudget();
    const transaction = await this.getTransaction();

    this.userBData = budget
    this.userTrData = transaction
  }
}

export class UserBalance extends User{
    constructor(supaService: ServiceManager) {
    super(supaService);
  }
  setup() {
    this.getBalance();
  }
}

export class UserPots extends User{
    constructor(supaService: ServiceManager) {
    super(supaService);
  }
  setup() {
    this.getPot();
  }
}
