const pageType: "pots" | "budgets" = window.location.pathname.includes("budgets") ? "budgets" : "pots";
export { pageType };
