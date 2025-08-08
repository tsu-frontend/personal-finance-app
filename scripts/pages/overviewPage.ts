// scripts/pages/overviewPage.ts
import { User } from "../models/User";

export class OverviewPage {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  async render() {
    const transactions = await this.user.getTransactions();
    const budgets = await this.user.getBudgets();
    const pots = await this.user.getPots();
    const balance = await this.user.getBalance();

    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = `
        <h1>Overview for ${this.user.name}</h1>
        <p>Transactions count: ${transactions.length}</p>
        <p>Budgets count: ${budgets.length}</p>
        <p>Pots count: ${pots.length}</p>
        <p>Total Balance: ${balance.total}</p>
      `;
    }
  }
}
