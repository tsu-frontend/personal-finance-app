type TTransaction = {
    id: string;
    amount: number;
    date: string;
};
type TBudget = {
    id: string;
    limit: number;
    category: string;
};
type TPot = {
    id: string;
    name: string;
    balance: number;
};
type TBalance = {
    total: number;
};
export declare class User {
    private id;
    name: string;
    email: string;
    constructor(id: string, name: string, email: string);
    getTransactions(): Promise<TTransaction[]>;
    getBudgets(): Promise<TBudget[]>;
    getPots(): Promise<TPot[]>;
    getBalance(): Promise<TBalance>;
}
export {};
//# sourceMappingURL=User.d.ts.map