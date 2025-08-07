export class User {
    constructor(supaService) {
        this.init(supaService);
    }
    async init(service) {
        const result = await service.getCurrentSession();
        this.supaService = service;
        if (result.success && result.data) {
            this.id = result.data.user.id;
            this.email = result.data.user.email;
            this.name = result.data.user.firstName;
            this.isUserSignedIn = !!this.id && !!this.email && !!this.name;
            console.log(this.isUserSignedIn);
        }
        else {
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
        const result = await this.supaService.list("transactions");
        if (result.success) {
            console.log(result.data);
            return result.data;
        }
        else {
            console.log("error");
        }
    }
    async getBudget() {
        const result = await this.supaService.list("budgets");
        if (result.success) {
            console.log(result.data);
            return result.data;
        }
        else {
            console.log("error");
        }
    }
    async getPot() {
        const result = await this.supaService.list("pots");
        if (result.success) {
            console.log(result.data);
            return result.data;
        }
        else {
            console.log("error");
        }
    }
    async getBalance() {
        const result = await this.supaService.list("balance");
        if (result.success) {
            console.log(result.data);
            return result.data;
        }
        else {
            console.log("error");
        }
    }
}
export class UserTransactions extends User {
    constructor(supaService) {
        super(supaService);
    }
    setup() {
        this.getTransaction();
    }
}
export class UserBudgets extends User {
    constructor(supaService) {
        super(supaService);
    }
    async setup() {
        const budget = await this.getBudget();
        const transaction = await this.getTransaction();
        this.userBData = budget;
        this.userTrData = transaction;
    }
}
